/** @jsx jsx */
import { useEffect, useState } from "react";
import Link from "next/link";
import { jsx } from "@emotion/core";
import { colors } from "@maael/temtem-theme";

export default function NavItem({
  url,
  children,
  exact = false,
  style
}: {
  url: string;
  children: string | JSX.Element;
  exact?: boolean;
  style?: React.CSSProperties;
}) {
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    setPathname(window.location.pathname);
  });
  return (
    <Link href={url}>
      <a
        css={{
          borderBottom: `2px solid ${
            (exact
            ? pathname === url
            : pathname.startsWith(url))
              ? colors.uiBlue
              : colors.uiBlueFaded
          }`,
          margin: "0 5px",
          padding: "0px 2px",
          cursor: "pointer",
          "&:hover": {
            borderColor: colors.uiBlue
          },
          textAlign: "center",
          ...style
        }}
      >
        {children}
      </a>
    </Link>
  );
}
