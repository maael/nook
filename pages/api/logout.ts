import cookies from "../../util/cookies";
import {COOKIE_NAME} from '../../util/constants';

export default cookies(function(_req, res) {
  res.cookie(COOKIE_NAME, "logged-out", {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
    sameSite: "Lax",
    path: "/"
  });
  res.writeHead(301, { Location: "/" });
  res.end();
});
