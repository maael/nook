/** @jsx jsx */
import { jsx } from "@emotion/core";
import { GiSwapBag } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import { FaClock, FaStar, FaFish } from "react-icons/fa";
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
  },
  row: {
    display: "flex",
    alignItems: "center",
    margin: "4px 0px",
    textAlign: "left"
  },
  center: {
    justifyContent: "center"
  },
  name: {
    marginTop: "0 !important",
    fontWeight: "bold",
    textAlign: "center"
  },
  icon: {
    marginLeft: 5,
    marginRight: 5
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
      <div css={[styles.row, styles.center, styles.name]}>{f.name}</div>
      <div css={styles.row}>
        <MdLocationOn style={styles.icon} /> {f.location}
      </div>
      <div css={styles.row}>
        <FaClock style={styles.icon} /> {f.time}
      </div>
      <div css={styles.row}>
        <FaFish style={styles.icon} /> {fishSizeMap[f.shadowSize] || "???"}{" "}
        Shadow
      </div>
      <div css={styles.row}>
        <GiSwapBag style={styles.icon} /> {f.price}
      </div>
      <div css={styles.row}>
        <FaStar style={styles.icon} /> {f.rarity}
      </div>
    </div>
  );
}
