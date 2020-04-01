import cookies from "../../../../util/cookies";
import { getUsers, updateUser, getUser } from "../../../../util/db";

export default cookies(async function(req, res) {
  if (req.method === "GET") {
    const users = await getUsers();
    res.json(users || { data: [] });
  } else if (req.method === "PUT") {
    const userJWT = await req.getJWT();
    if (!userJWT) {
      res.status(400).json({ error: "not authenticated" });
      return;
    }
    const existing = await getUser(userJWT._id);
    res.json(
      await updateUser(userJWT._id, {
        ...existing,
        ...req.body
      })
    );
  } else {
    res.json({ error: "not-implemented" });
  }
});
