import cookies from "../../../../../util/cookies";
import {
  getUserByRedditName,
  getUserByDiscordFullName
} from "../../../../../util/db";

export default cookies(async function(req, res) {
  const { id, type } = req.query;
  const safeId = type === "discord" ? id.replace("-d-", "#") : id;
  const method =
    type === "reddit" ? getUserByRedditName : getUserByDiscordFullName;
  if (req.method === "GET") {
    const user = await method(safeId);
    res.json(user || {});
    return;
  } else {
    res.json({ error: "not-implemented" });
  }
});
