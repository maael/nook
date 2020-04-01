import useJWT from "../hooks/useJWT";
import { JWT_VERSION } from "../../util/constants";

export default function RequireAuth({ children }: { children: any }) {
  const jwt = useJWT();
  const isValid = jwt && jwt.version === JWT_VERSION;
  return isValid ? children : null;
}
