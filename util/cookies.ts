import { serialize, parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import * as jwt from "../util/jwt";
import { JWT_VERSION, COOKIE_NAME } from "../util/constants";
import { JWT } from "../types/index";

export type NextApiResponseWithCookie = NextApiResponse & {
  cookie: (name: string, value: string, options: any) => void;
};

export type NextApiRequestWithJWT = Omit<NextApiRequest, "query"> & {
  getJWT: () => Promise<JWT | undefined>;
  query: Record<string, string>;
};
/**
 * This sets `cookie` on `res` object
 */
const cookie = (
  res: NextApiResponse,
  name: string,
  value: string | object,
  options: any = {}
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + Number(options.maxAge));
    options.maxAge /= 1000;
  }

  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
};

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
const cookies = (
  handler: (
    req: NextApiRequestWithJWT,
    res: NextApiResponseWithCookie
  ) => void | Promise<void>
) => async (req: NextApiRequestWithJWT, res: NextApiResponseWithCookie) => {
  res.cookie = (name, value, options) => cookie(res, name, value, options);
  req.getJWT = async () => {
    const items = parse(req.headers.cookie || "");
    if (!items[COOKIE_NAME]) return undefined;
    const decoded = await jwt.verify(items[COOKIE_NAME]);
    if (decoded && decoded.version !== JWT_VERSION) return undefined;
    return decoded;
  };
  try {
    await handler(req, res);
    return;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default cookies;
