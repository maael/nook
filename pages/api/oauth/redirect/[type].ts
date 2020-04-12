import { NextApiRequest, NextApiResponse } from "next";
import discordHandleRedirect from "../../../../util/auth/redirect/discord";
import redditHandleRedirect from "../../../../util/auth/redirect/reddit";

export default async function(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.type === "discord") {
    await discordHandleRedirect(req, res);
  } else if (req.query.type === "reddit") {
    await redditHandleRedirect(req, res);
  } else {
    res.status(500).send("Not found");
  }
}
