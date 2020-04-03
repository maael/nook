/** @jsx jsx */
import { jsx } from "@emotion/core";
import {fishSizeMap} from '../../util/collections';
import { colors } from "../../util/theme";

const styles = {
  fishItem: {
    textDecoration: "none",
    display: "inline-block",
    padding: 10,
    margin: 5,
    color: colors.blueLight,
    backgroundColor: colors.blueDark,
    borderRadius: "1em",
    width: 150
  }
} as const;

export default function FishItem({ fish: f }: any) {
  return (
    <a key={f.name} href={f.wikiUrl} css={styles.fishItem}>
      <img src={f.wikiImageUrl} />
      <div>{f.name}</div>
      <div>{f.location}</div>
      <div>{f.time}</div>
      <div>{fishSizeMap[f.shadowSize] || "???"} Shadow</div>
      <div>{f.price} Bells</div>
    </a>
  );
}