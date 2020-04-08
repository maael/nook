import jwtGuard from "../../../../util/middlewares/jwtGuard";
import paramGuard from "../../../../util/middlewares/paramGuard";
import cookies from "../../../../util/cookies";
import { deleteCustomDesign } from "../../../../util/db";
import { remove } from "../../../../util/s3";

export default paramGuard(
  cookies(
    jwtGuard(async function(req, res) {
      if (req.method === "DELETE") {
        try {
          const deleted = await deleteCustomDesign(req.query.id);
          await remove(deleted.s3Url);
          res.json(deleted);
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
