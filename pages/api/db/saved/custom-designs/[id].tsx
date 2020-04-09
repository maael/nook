import jwtGuard from "../../../../../util/middlewares/jwtGuard";
import paramGuard from "../../../../../util/middlewares/paramGuard";
import cookies from "../../../../../util/cookies";
import { deleteSavedCustomDesign } from "../../../../../util/db";

export default paramGuard(
  cookies(
    jwtGuard(async function(req, res) {
      if (req.method === "DELETE") {
        try {
          res.json(await deleteSavedCustomDesign(req.query.id));
        } catch (e) {
          res.status(500).json({ err: e.message });
        }
      } else {
        res.json({ error: "not-implemented" });
      }
    })
  ),
  ["id"]
);
