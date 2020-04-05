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
  getFossilsItemByUserAndName
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
