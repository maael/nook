import { COOKIE_NAME } from "../../../../util/constants";
import * as jwt from "../../../../util/jwt";
import cookies, {
  NextApiRequestWithJWT,
  NextApiResponseWithCookie
} from "../../../../util/cookies";
import jwtGuard from "../../../../util/middlewares/jwtGuard";
import paramGuard from "../../../../util/middlewares/paramGuard";
import {
  getBugItems,
  getDiyItems,
  getFishItems,
  getFossilsItems,
  createBugItem,
  createFossilsItem,
  createFishItem,
  createDiyItem,
  deleteBugItem,
  deleteDiyItem,
  deleteFishItem,
  deleteFossilsItem,
  getBugItemByUserAndName,
  getDiyItemByUserAndName,
  getFishItemByUserAndName,
  getFossilsItemByUserAndName,
  getUser,
  updateUser
} from "../../../../util/db";

const typeGetMap = {
  fish: getFishItems,
  bugs: getBugItems,
  diy: getDiyItems,
  fossils: getFossilsItems
};

const typeGetItemMap = {
  fish: getFishItemByUserAndName,
  bugs: getBugItemByUserAndName,
  diy: getDiyItemByUserAndName,
  fossils: getFossilsItemByUserAndName
};

const typePostMap = {
  fish: createFishItem,
  bugs: createBugItem,
  diy: createDiyItem,
  fossils: createFossilsItem
};

const typeDeleteMap = {
  fish: deleteFishItem,
  bugs: deleteBugItem,
  diy: deleteDiyItem,
  fossils: deleteFossilsItem
};

export default paramGuard(
  cookies(
    jwtGuard(async function(
      req: NextApiRequestWithJWT,
      res: NextApiResponseWithCookie
    ) {
      const userJWT = await req.getJWT();
      const type = req.query.type;
      if (type === "sync") {
        await handleSync(req, res);
        return;
      }
      if (req.method === "GET") {
        const result = await typeGetMap[type](userJWT!._id);
        res.json(result);
      } else if (req.method === "POST") {
        const result = await typePostMap[type](userJWT!._id, req.body.name);
        res.json(result);
      } else if (req.method === "DELETE") {
        const existing = await typeGetItemMap[type](
          userJWT!._id,
          req.body.name
        );
        if (existing) {
          await typeDeleteMap[type](existing._id);
        }
        res.json({ status: "ok" });
      } else {
        res.json({ error: "not-implemented" });
      }
    })
  ),
  ["type"]
);

async function handleSync(
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
}

async function batchCreate(
  userId: string,
  data: any[],
  method: (userId: string, item: any) => void
) {
  await Promise.all(data.map(d => method(userId, d)));
}
