/** @jsx jsx */
import { jsx } from "@emotion/core";
import { colors } from "../../util/theme";

export default function Heading({
  children,
  size = 20
}: {
  size?: number;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          backgroundColor: colors.blueDark,
          color: colors.blueLight,
          fontWeight: "bold",
          fontSize: size,
          padding: "4px 8px",
          margin: "5px 0px",
          display: "inline-block",
          borderRadius: "0.3em"
        }}
      >
        {children}
      </div>
    </div>
  );
}
