/** @jsx jsx */
import { jsx } from "@emotion/core";
import { fishSizeMap } from "../../util/collections";
import { colors } from "../../util/theme";

const styles = {
  fishItem: {
    textDecoration: "none",
    display: "inline-block",
    padding: 5,
    margin: 5,
    color: colors.blueLight,
    backgroundColor: colors.blueDark,
    borderRadius: "1em",
    width: 150,
    cursor: "pointer"
  }
} as const;

interface Props {
  fish: any;
  onClick: () => void;
  inCollection: boolean;
}

export default function FishItem({ fish: f, onClick, inCollection }: Props) {
  return (
    <div
      onClick={onClick}
      css={styles.fishItem}
      style={{
        color: inCollection ? colors.blueDark : colors.blueLight,
        backgroundColor: inCollection ? colors.blueLight : colors.blueDark
      }}
    >
      <img src={f.wikiImageUrl} />
      <div>{f.name}</div>
      <div>{f.location}</div>
      <div>{f.time}</div>
      <div>{fishSizeMap[f.shadowSize] || "???"} Shadow</div>
      <div>{f.price} Bells</div>
    </div>
  );
}
