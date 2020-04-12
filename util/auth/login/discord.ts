import { stringify } from "querystring";
import { NextApiResponse } from "next";

export default function(res: NextApiResponse) {
  const redirectUri = `https://discordapp.com/oauth2/authorize?${stringify({
    client_id: process.env.DISCORD_OAUTH_ID,
    response_type: "code",
    state: process.env.OAUTH_STATE,
    redirect_uri: `${process.env.OAUTH_REDIRECT_ORIGIN}/api/oauth/redirect/discord`,
    scope: "identify",
    prompt: "none"
  })}`;
  res.writeHead(301, { Location: redirectUri });
  res.end();
}
