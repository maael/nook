import formidable from "formidable";
import jwtGuard from "../../../../util/middlewares/jwtGuard";
import cookies, { NextApiRequestWithJWT } from "../../../../util/cookies";

async function parseForm(
  req: NextApiRequestWithJWT
): Promise<{ files: formidable.Files; fields: formidable.Fields }> {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req as any, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ fields, files });
    });
  });
}

export default cookies(
  jwtGuard(async function(req, res) {
    if (req.method === "POST") {
      const { fields, files } = await parseForm(req);
      console.info(fields, files);
      res.json({ fields });
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
