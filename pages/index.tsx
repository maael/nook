/** @jsx jsx */
import { jsx } from "@emotion/core";
import Link from "next/link";
import { colors } from "@maael/temtem-theme";

export default function Home() {
  return (
    <div
      css={{
        margin: "0px auto",
        textAlign: "center",
        padding: 10,
        maxWidth: 1000
      }}
    >
      Nook Services
    </div>
  );
}
