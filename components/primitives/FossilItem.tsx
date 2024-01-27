/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React from "react";
import { GiSwapBag } from "react-icons/gi";
import SafeImage from "./SafeImage";
import { colors } from "../../util/theme";
import { getImageUrl } from "../../util/getImageUrl";

const styles = {
  fossilItem: {
    textDecoration: "none",
    display: "inline-block",
    padding: 5,
    margin: 5,
    color: colors.blueLight,
    backgroundColor: colors.blueDark,
    borderRadius: "1em",
    width: 150,
    cursor: "pointer"
  },
  title: {
    fontWeight: "bold",
    marginBottom: 2
  }
} as const;

interface Props {
  fossil: any;
  onClick: () => void;
  inCollection: boolean;
}

export default function FossilItem({
  fossil: f,
  onClick,
  inCollection
}: Props) {
  return (
    <div
      onClick={onClick}
      css={styles.fossilItem}
      style={{
        color: inCollection ? colors.blueDark : colors.blueLight,
        backgroundColor: inCollection ? colors.blueLight : colors.blueDark
      }}
    >
      <SafeImage src={getImageUrl("fossil", f.icon)} />
      <div css={styles.title}>{f.name}</div>
      <div>
        <GiSwapBag /> {f.sellPrice}
      </div>
    </div>
  );
}
