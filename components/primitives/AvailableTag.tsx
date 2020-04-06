/** @jsx jsx */
import { jsx } from "@emotion/core";
import { FaClock } from "react-icons/fa";
import { colors } from "../../util/theme";

export default function AvailableTag() {
  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        color: colors.blueGreen,
        fontSize: 11,
        display: "flex",
        alignItems: "center"
      }}
    >
      <FaClock style={{ marginRight: 2 }} /> Available
    </div>
  );
}
