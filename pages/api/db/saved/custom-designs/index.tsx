import jwtGuard from "../../../../../util/middlewares/jwtGuard";
import cookies from "../../../../../util/cookies";
import {
  getSavedCustomDesignsForUser,
  createSavedCustomDesign
} from "../../../../../util/db";

export default cookies(
  jwtGuard(async function(req, res) {
    const jwt = await req.getJWT();
    if (req.method === "GET") {
      res.json(
        await getSavedCustomDesignsForUser(
          jwt!._id,
          !!req.query.idsOnly || false
        )
      );
    } else if (req.method === "POST") {
      res.json(
        await createSavedCustomDesign(jwt!._id, req.body.customDesignId)
      );
    } else {
      res.json({ error: "not-implemented" });
    }
  })
);
