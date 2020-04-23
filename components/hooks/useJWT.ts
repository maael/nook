import { useEffect, useState } from "react";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { JWT } from "../../types";
import { JWT_VERSION, COOKIE_NAME } from "../../util/constants";

export default function useJWT() {
  const [userJWT, setUserJWT] = useState<JWT | null>();

  useEffect(() => {
    const jwt = getJWT();
    if (!userJWT && isValidJWT(jwt)) {
      setUserJWT(jwt);
    }
  });
  return userJWT;
}

export function getJWT() {
  const parsed = cookie.parse(document.cookie)[COOKIE_NAME];
  const decoded = jwt.decode(parsed, { json: true });
  return isValidJWT(decoded) ? decoded : undefined;
}

function isValidJWT(inp: any): inp is JWT {
  return inp && typeof inp === "object" && inp.version === JWT_VERSION;
}
