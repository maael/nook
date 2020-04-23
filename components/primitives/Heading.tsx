/** @jsx jsx */
import { jsx } from "@emotion/core";
import { CSSProperties } from "react";
import { colors } from "../../util/theme";

/**
 *
 * @param size - Default 20
 */
export default function Heading({
  children,
  size = 20,
  style = {},
  containerStyle = {}
}: {
  size?: number;
  children: React.ReactNode;
  style?: CSSProperties;
  containerStyle?: CSSProperties;
}) {
  return (
    <div style={containerStyle}>
      <div
        style={{
          backgroundColor: colors.blueDark,
          color: colors.blueLight,
          fontWeight: "bold",
          fontSize: size,
          padding: "4px 8px",
          margin: "5px 0px",
          display: "inline-block",
          borderRadius: "0.3em",
          ...style
        }}
      >
        {children}
      </div>
    </div>
  );
}
