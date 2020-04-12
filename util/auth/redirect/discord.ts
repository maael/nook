import qs from "querystring";
import got from "got";
import * as jwt from "../../jwt";
import cookies, { NextApiResponseWithCookie } from "../../cookies";
import { getUserByDiscordId, createUser } from "../../db";
import { JWT_VERSION, COOKIE_NAME } from "../../constants";
import { User } from "../../../types/db";
import { JWT } from "../../../types";
import { updateUser } from "../../db/user";

export default cookies(async function(req, res) {
  const { code, _state } = req.query;
  const { access_token, token_type } = await getTokenFromCode(code);
  const identity = await getIdentityFromToken(token_type, access_token);
  const user = await getOrCreateUser(identity);
  await setUserCookie(res, user);
  res.writeHead(301, { Location: "/" });
  res.end();
});

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
}

async function setUserCookie(
  res: NextApiResponseWithCookie,
  user: Pick<
    User,
    | "_id"
    | "discordIcon"
    | "discordName"
    | "discordId"
    | "discordDiscriminator"
    | "discordFullName"
    | "hasHadFirstSync"
  >
) {
  const toEncode: JWT = {
    ...user,
    version: JWT_VERSION
  };
  const jwtToken = await jwt.sign(toEncode);
  res.cookie(COOKIE_NAME, jwtToken as string, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
    sameSite: "Lax",
    path: "/"
  });
}

async function getIdentityFromToken(
  tokenType: string,
  accessToken: string
): Promise<DiscordUser> {
  return got(`https://discordapp.com/api/users/@me`, {
    headers: {
      Authorization: `${tokenType} ${accessToken}`
    }
  }).json();
}

async function getTokenFromCode(
  code: string
): Promise<{
  access_token: string;
  token_type: string;
  expires_in: string;
  refresh_token: string;
  scope: string;
}> {
  const basicAuth = Buffer.from(
    `${process.env.DISCORD_OAUTH_ID!}:${process.env.DISCORD_OAUTH_SECRET!}`,
    "utf-8"
  ).toString("base64");
  return got
    .post(
      `https://discordapp.com/api/oauth2/token?${qs.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: `${process.env.OAUTH_REDIRECT_ORIGIN}/api/oauth/redirect/discord`,
        scope: "identity"
      })}`,
      {
        headers: {
          Authorization: `Basic ${basicAuth}`
        }
      }
    )
    .json();
}

async function getOrCreateUser(
  identity: DiscordUser
): Promise<
  Pick<
    User,
    | "_id"
    | "discordIcon"
    | "discordName"
    | "discordId"
    | "discordDiscriminator"
    | "discordFullName"
    | "hasHadFirstSync"
  >
> {
  const result = await getUserByDiscordId(identity.id);
  if (result) {
    const info = {
      _id: result._id,
      discordName: identity.username,
      discordId: identity.id,
      discordDiscriminator: identity.discriminator,
      discordIcon: identity.avatar
        ? `https://cdn.discordapp.com/avatars/${identity.id}/${identity.avatar}.png`
        : `https://cdn.discordapp.com/embed/avatars/${Number(
            identity.discriminator
          ) % 5}.png`,
      discordFullName: `${identity.username}#${identity.discriminator}`,
      hasHadFirstSync: !!result.hasHadFirstSync
    };
    await updateUser(result._id, { ...result, ...info });
    return info;
  }
  const {
    _id,
    discordIcon,
    discordName,
    discordId,
    discordDiscriminator,
    discordFullName,
    hasHadFirstSync
  } = await createUser({
    discordIcon: identity.avatar
      ? `https://cdn.discordapp.com/avatars/${identity.id}/${identity.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/${Number(
          identity.discriminator
        ) % 5}.png`,
    discordName: identity.username,
    discordId: identity.id,
    discordDiscriminator: identity.discriminator,
    discordFullName: `${identity.username}#${identity.discriminator}`
  });
  return {
    _id,
    discordIcon,
    discordName,
    discordId,
    discordDiscriminator,
    discordFullName,
    hasHadFirstSync: !!hasHadFirstSync
  };
}
