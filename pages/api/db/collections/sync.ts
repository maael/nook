import { COOKIE_NAME } from "../../../../util/constants";
import * as jwt from "../../../../util/jwt";
import cookies, {
  NextApiRequestWithJWT,
  NextApiResponseWithCookie
} from "../../../../util/cookies";
import jwtGuard from "../../../../util/middlewares/jwtGuard";
import {
  getUser,
  updateUser,
  createBugItem,
  createDiyItem,
  createFishItem,
  createFossilsItem
} from "../../../../util/db";

export default cookies(
  jwtGuard(async function(
    req: NextApiRequestWithJWT,
    res: NextApiResponseWithCookie
  ) {
    if (req.method === "POST") {
      const userJWT = await req.getJWT();
      const user = await getUser(userJWT!._id);
      if (!user.hasHadFirstSync) {
        await Promise.all([
          batchCreate(userJWT!._id, req.body.fish, createFishItem),
          batchCreate(userJWT!._id, req.body.bugs, createBugItem),
          batchCreate(userJWT!._id, req.body.fossils, createFossilsItem),
          batchCreate(userJWT!._id, req.body.diy, createDiyItem)
        ]);
        await updateUser(userJWT!._id, { ...user, hasHadFirstSync: true });
        const jwtToken = await jwt.sign({ ...userJWT, hasHadFirstSync: true });
        res.cookie(COOKIE_NAME, jwtToken as string, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
          sameSite: "Lax",
          path: "/"
        });
        res.json({ status: "synced" });
      } else {
        res.json({ status: "skipped-sync" });
      }
    } else {
      res.json({ error: "not-implemented" });
    }
  })
);

async function batchCreate(
  userId: string,
  data: any[],
  method: (userId: string, item: any) => void
) {
  await Promise.all(data.map(d => method(userId, d)));
}
