/** @jsx jsx */
import { jsx } from "@emotion/core";
import Link from "next/link";
import { FaDiscord, FaRedditAlien } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import useJWT from "../hooks/useJWT";
import { JWT_VERSION } from "../../util/constants";
import * as userUtil from "../../util/user";
import { colors as nookTheme, styles } from "../../util/theme";

export default function AuthBlock() {
  const jwt = useJWT();
  return jwt ? (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        top: -2
      }}
    >
      <Link href="/user/[type]/[name]" as={userUtil.getUserProfileLink(jwt)}>
        <a
          css={{
            textDecoration: "none",
            cursor: "pointer",
            flexDirection: "row",
            display: "flex",
            alignItems: "center"
          }}
        >
          <img
            css={{
              border: `2px solid ${nookTheme.blueLight}`,
              height: 25,
              width: 25,
              borderRadius: "50%",
              margin: "0px 5px"
            }}
            src={userUtil.getUserIcon(jwt)}
          />
        </a>
      </Link>
      <a href={`/api/logout?v${JWT_VERSION}&cb=${Math.random()}`}>
        <button
          css={styles.button}
          style={{
            height: 25,
            width: 25,
            padding: 4,
            backgroundColor: nookTheme.blueLight
          }}
        >
          <FiLogOut color={nookTheme.blueDark} size={16} />
        </button>
      </a>
    </div>
  ) : (
    <div css={{ marginLeft: 10, position: "relative", top: -2 }}>
      <a
        href={`/api/login/reddit?v${JWT_VERSION}&cb=${Math.random()}`}
        css={{ textDecoration: "none", display: "inline-block" }}
      >
        <button
          css={styles.button}
          style={{
            backgroundColor: "#FF5700",
            color: "#FFFFFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <FaRedditAlien size={18} style={{ marginRight: 4 }} />
          Login
        </button>
      </a>
      <a
        href={`/api/login/discord?v${JWT_VERSION}&cb=${Math.random()}`}
        css={{ textDecoration: "none", display: "inline-block" }}
      >
        <button
          css={styles.button}
          style={{
            backgroundColor: "#7289DA",
            color: "#FFFFFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <FaDiscord size={18} style={{ marginRight: 4 }} />
          Login
        </button>
      </a>
    </div>
  );
}
