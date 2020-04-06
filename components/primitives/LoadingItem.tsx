/** @jsx jsx */
import { jsx } from "@emotion/core";
import Loader from "react-spinners/BounceLoader";
import { colors } from "../../util/theme";

export default function LoadingItem() {
  return (
    <div
      css={{
        textDecoration: "none",
        display: "inline-block",
        padding: 5,
        margin: 5,
        color: colors.blueLight,
        backgroundColor: colors.blueDark,
        borderRadius: "1em",
        height: 125,
        width: 125,
        cursor: "pointer",
        position: "relative"
      }}
    >
      <div
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <Loader color={colors.blueLight} size={50} />
      </div>
    </div>
  );
}
