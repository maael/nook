import got from "got";
import url from "url";
import { stringify } from "querystring";
import cookies from "../../../../util/cookies";
import * as jwt from "../../../../util/jwt";
import { JWT } from "../../../../types";
import { createUser, getUserByRedditName } from "../../../../util/db";
import { JWT_VERSION, COOKIE_NAME } from "../../../../util/constants";

async function getOrCreateUser(identity: any) {
  const result = await getUserByRedditName(identity.name);
  if (result) {
    return {
      _id: result._id,
      redditName: result.redditName,
      redditId: result.redditId,
      redditDarkmode: result.redditDarkmode,
      redditIcon: result.redditIcon,
      hasHadFirstSync: result.hasHadFirstSync
    };
  }
  const parsedIconUrl = url.parse(identity.icon_img);
  const {
    _id,
    redditName,
    redditId,
    redditDarkmode,
    redditIcon,
    hasHadFirstSync
  } = await createUser({
    redditDarkmode: identity.pref_nightmode,
    redditIcon: `${parsedIconUrl.protocol}//${parsedIconUrl.host}${parsedIconUrl.pathname}`,
    redditName: identity.name,
    redditId: identity.id
  });
  return {
    _id,
    redditName,
    redditId,
    redditDarkmode,
    redditIcon,
    hasHadFirstSync
  };
}

export default cookies(async function(req, res) {
  const { error, code, state } = req.query;
  try {
    if (!error) {
      if (state === process.env.OAUTH_STATE) {
        const { access_token } = await getAccessToken(code);
        if (access_token) {
          const identity = await getIdentity(access_token);
          const {
            _id,
            redditName,
            redditId,
            redditDarkmode,
            redditIcon,
            hasHadFirstSync
          } = await getOrCreateUser(identity);
          const toEncode: JWT = {
            _id,
            redditId: redditId!,
            redditName: redditName!,
            redditIcon: redditIcon!,
            redditDarkmode: redditDarkmode!,
            hasHadFirstSync: !!hasHadFirstSync,
            version: JWT_VERSION
          };
          const jwtToken = await jwt.sign(toEncode);
          res.cookie(COOKIE_NAME, jwtToken as string, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
            sameSite: "Lax",
            path: "/"
          });
          res.writeHead(301, { Location: "/" });
          res.end();
        } else {
          res.writeHead(302, { Location: "/?error=missing_access_token" });
          res.end();
        }
      } else {
        res.writeHead(302, { Location: "/?error=state_mismatch" });
        res.end();
      }
    } else {
      if (error === "access_denied") {
        res.writeHead(302, { Location: "/" });
        res.end();
      } else {
        res.writeHead(302, { Location: `/?error=${error}` });
        res.end();
      }
    }
  } catch (err) {
    res.writeHead(302, {
      Location: `/?error=${encodeURIComponent(err.message)}`
    });
    res.end();
  }
});

async function getAccessToken(code: string) {
  const tokenUri = `https://www.reddit.com/api/v1/access_token`;
  const body = stringify({
    grant_type: "authorization_code",
    code,
    redirect_uri: `${process.env.OAUTH_REDIRECT_ORIGIN}/api/oauth/redirect/reddit`
  });
  const Authorization = `Basic ${Buffer.from(
    `${process.env.REDDIT_OAUTH_ID}:${process.env.REDDIT_OAUTH_SECRET}`
  ).toString("base64")}`;
  const gotRes = await got(tokenUri, {
    method: "POST",
    body,
    headers: { Authorization }
  });
  if (gotRes.statusCode === 200) {
    return JSON.parse(gotRes.body || "{}");
  } else {
    console.error("[auth error]", gotRes.body);
  }
}

async function getIdentity(accessToken: string) {
  const res = await got("https://oauth.reddit.com/api/v1/me", {
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  });
  if (res.statusCode === 200) {
    return JSON.parse(res.body || "{}");
  } else {
    console.error("[auth error]", res.body);
  }
}
