import multer from "multer";
import jwtGuard from "../../../../util/middlewares/jwtGuard";
import cookies, { NextApiRequestWithJWT } from "../../../../util/cookies";
import { upload } from "../../../../util/s3";
import { createCustomDesign, getCustomDesigns } from "../../../../util/db";

const TWO_MB = 2e6;
const uploadMiddleware = multer({
  dest: "uploads/",
  storage: multer.memoryStorage(),
  limits: {
    fields: 4,
    files: 1,
    fileSize: TWO_MB,
    fieldNameSize: 10
  }
});

function getFields(
  req: NextApiRequestWithJWT
): Promise<{ fields: Record<string, string>; file: Express.Multer.File }> {
  return new Promise((resolve, reject) => {
    uploadMiddleware.single("img")(req as any, {} as any, async err => {
      if (err) {
        reject(err);
        return;
      }
      const fields = req.body;
      const file = (req as any).file;
      resolve({ fields, file });
    });
  });
}

export default cookies(
  jwtGuard(async function(req, res) {
    const jwt = await req.getJWT();
    if (req.method === "GET") {
      res.json(await getCustomDesigns());
    } else if (req.method === "POST") {
      try {
        const { fields, file } = await getFields(req);
        // TODO: Check with Tesseract
        const tags = JSON.parse(fields.tags || "[]");
        if (fields.code && fields.title && fields.type && tags && file) {
          const s3Url = await upload(jwt!._id, fields.code as string, file);
          const created = await createCustomDesign(jwt!._id, {
            ...(fields as any),
            tags,
            s3Url
          });
          res.json(created);
        } else {
          res.status(500).json({ err: "Missing fields" });
        }
      } catch (e) {
        if (e instanceof multer.MulterError) {
          res.json({ err: e.message });
        } else if (e) {
          res.json({ err: e.message });
        }
      }
    } else {
      res.json({ error: "not-implemented" });
    }
  })
);

export const config = {
  api: {
    bodyParser: false
  }
};
