/** @jsx jsx */
import { jsx } from "@emotion/core";
import { colors } from "../../util/theme";

const styles = {
  fishItem: {
    textDecoration: "none",
    display: "inline-block",
    padding: 5,
    margin: 5,
    color: colors.blueLight,
    backgroundColor: colors.blueDark,
    borderRadius: "1em"
  }
} as const;

const sizeMap = {
  1: "Tiny",
  2: "Small",
  3: "Medium",
  4: "Large",
  5: "Huge",
  6: "Massive"
};

export default function FishItem({ fish: f }: any) {
  return (
    <a key={f.name} href={f.wikiUrl} css={styles.fishItem}>
      <img src={f.wikiImageUrl} />
      <div>{f.name}</div>
      <div>{f.location}</div>
      <div>{f.time}</div>
      <div>{sizeMap[f.shadowSize] || "???"} Shadow</div>
      <div>{f.price} Bells</div>
    </a>
  );
}