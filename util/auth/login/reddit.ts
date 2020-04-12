import { stringify } from "querystring";
import { NextApiResponse } from "next";

export default function(res: NextApiResponse) {
  const redirectUri = `https://www.reddit.com/api/v1/authorize?${stringify({
    client_id: process.env.REDDIT_OAUTH_ID,
    response_type: "code",
    state: process.env.OAUTH_STATE,
    redirect_uri: `${process.env.OAUTH_REDIRECT_ORIGIN}/api/oauth/redirect/reddit`,
    duration: "temporary",
    scope: "identity"
  })}`;
  res.writeHead(301, { Location: redirectUri });
  res.end();
}
