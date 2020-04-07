import { NextApiResponseWithCookie, NextApiRequestWithJWT } from "../cookies";

const jwtGuard = (
  handler: (
    req: NextApiRequestWithJWT,
    res: NextApiResponseWithCookie
  ) => void | Promise<void>
) => async (req: NextApiRequestWithJWT, res: any) => {
  try {
    const userJWT = await req.getJWT();
    if (!userJWT) {
      console.warn("failed jwt guard");
      res.status(400).json({ error: "not authenticated" });
      return undefined;
    }
    await handler(req, res);
    return undefined;
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
};

export default jwtGuard;
