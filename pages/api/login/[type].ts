import { NextApiRequest, NextApiResponse } from "next";
import discordLoginRedirect from "../../../util/auth/login/discord";
import redditLoginRedirect from "../../../util/auth/login/reddit";

export default function(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.type === "discord") {
    discordLoginRedirect(res);
  } else if (req.query.type === "reddit") {
    redditLoginRedirect(res);
  } else {
    res.status(500).send("Not found");
  }
}
