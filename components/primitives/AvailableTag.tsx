/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React from "react";
import { FaClock } from "react-icons/fa";
import { colors } from "../../util/theme";

export default function AvailableTag({ filled }: { filled?: boolean }) {
  return (
    <div
      css={[
        {
          position: "absolute",
          top: 10,
          left: 10,
          color: colors.blueGreen,
          fontSize: 11,
          display: "flex",
          alignItems: "center",
          padding: "2px 4px"
        },
        filled && {
          backgroundColor: colors.blueDark,
          borderRadius: "0.3em"
        }
      ]}
    >
      <FaClock style={{ marginRight: 2 }} /> Available
    </div>
  );
}
