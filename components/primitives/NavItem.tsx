/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import Link from "next/link";
import { jsx } from "@emotion/react";
import React from "react";
import { colors as nookTheme } from "../../util/theme";

export default function NavItem({
  url,
  children,
  exact = false,
  style
}: {
  url: string;
  children: string | JSX.Element;
  exact?: boolean;
  style?: any;
}) {
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    setPathname(window.location.pathname);
  });
  return (
    <Link
      href={url}
      css={{
        textDecoration: "none",
        color: "white",
        borderBottom: `2px solid ${
          (exact
          ? pathname === url
          : pathname.startsWith(url))
            ? nookTheme.offWhite
            : nookTheme.blueLight
        }`,
        margin: "0 5px",
        padding: "0px 2px",
        cursor: "pointer",
        "&:hover": {
          borderColor: nookTheme.offWhite
        },
        textAlign: "center",
        ...style
      }}
    >
      {children}
    </Link>
  );
}
