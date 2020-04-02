/** @jsx jsx */
import { jsx } from "@emotion/core";
import Link from "next/link";
import { FaDiscord, FaRedditAlien } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import TemtemButton from "@maael/temtem-button-component";
import { colors } from "@maael/temtem-theme";
import useJWT from "../hooks/useJWT";
import { JWT_VERSION } from "../../util/constants";
import * as userUtil from "../../util/user";
import {colors as nookTheme} from '../../util/theme';

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
              height: 30,
              width: 30,
              borderRadius: "50%",
              margin: "0px 5px"
            }}
            src={userUtil.getUserIcon(jwt)}
          />
        </a>
      </Link>
      <a href={`/api/logout?v${JWT_VERSION}&cb=${Math.random()}`}>
        <TemtemButton
          type={"Neutral" as any}
          style={{ height: 30, width: 30, padding: 7 }}
          bgColor={nookTheme.blueLight}
        >
          <FiLogOut color={nookTheme.blueDark} size={16} />
        </TemtemButton>
      </a>
    </div>
  ) : (
    <div css={{ marginLeft: 10, position: "relative", top: -2 }}>
      <a href={`/api/login/reddit?v${JWT_VERSION}&cb=${Math.random()}`}>
        <TemtemButton
          type={"Neutral" as any}
          bgColor="#FF5700"
          size="small"
          style={{ padding: 5, paddingLeft: 30, position: "relative" }}
        >
          <>
            <FaRedditAlien
              style={{ fontSize: 18, position: "absolute", left: 5, top: 3 }}
            />
            Login
          </>
        </TemtemButton>
      </a>
      <a href={`/api/login/discord?v${JWT_VERSION}&cb=${Math.random()}`}>
        <TemtemButton
          type={"Neutral" as any}
          bgColor="#7289DA"
          size="small"
          style={{ padding: 5, paddingLeft: 30, position: "relative" }}
        >
          <>
            <FaDiscord
              style={{ fontSize: 18, position: "absolute", left: 5, top: 4 }}
            />
            Login
          </>
        </TemtemButton>
      </a>
    </div>
  );
}
