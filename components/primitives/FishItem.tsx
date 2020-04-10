/** @jsx jsx */
import { jsx } from "@emotion/core";
import { GiSwapBag } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import { FaClock, FaStar, FaFish } from "react-icons/fa";
import AvailableTag from "./AvailableTag";
import {
  fishSizeMap,
  isDisappearingThisMonth,
  isNewThisMonth,
  isCurrentlyAvailable
} from "../../util/collections";
import { colors } from "../../util/theme";
import { getImageUrl } from "../../util/getImageUrl";

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
    cursor: "pointer",
    position: "relative"
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
  },
  label: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 2,
    borderRadius: "0.3em",
    fontWeight: "bold",
    color: colors.blueDark,
    backgroundColor: colors.blueLight,
    fontSize: 11
  },
  labelInCollection: {
    color: colors.blueLight,
    backgroundColor: colors.blueDark
  }
} as const;

interface Props {
  fish: any;
  month?: number;
  hemisphere: string;
  onClick: () => void;
  inCollection: boolean;
}

export default function FishItem({
  fish: f,
  onClick,
  inCollection,
  hemisphere,
  month
}: Props) {
  const months =
    hemisphere === "Northern Hemisphere" ? f.northernMonths : f.southernMonths;
  const newThisMonth =
    month !== undefined ? isNewThisMonth(months, month) : false;
  const disappearingThisMonth =
    month !== undefined ? isDisappearingThisMonth(months, month) : false;
  return (
    <div
      onClick={onClick}
      css={styles.fishItem}
      style={{
        color: inCollection ? colors.blueDark : colors.blueLight,
        backgroundColor: inCollection ? colors.blueLight : colors.blueDark
      }}
    >
      <img src={getImageUrl("fish", f.name)} />
      <div css={[styles.row, styles.center, styles.name]}>{f.name}</div>
      <div css={styles.row}>
        <div>
          <MdLocationOn style={styles.icon} />
        </div>
        <div>{f.location}</div>
      </div>
      <div css={styles.row}>
        <div>
          <FaClock style={styles.icon} />
        </div>
        <div>{f.time}</div>
      </div>
      <div css={styles.row}>
        <div>
          <FaFish style={styles.icon} />
        </div>
        <div>{fishSizeMap[f.shadowSize] || "???"} Shadow</div>
      </div>
      <div css={styles.row}>
        <div>
          <GiSwapBag style={styles.icon} />
        </div>
        <div>{f.price}</div>
      </div>
      <div css={styles.row}>
        <div>
          <FaStar style={styles.icon} />
        </div>
        <div>{f.rarity}</div>
      </div>
      {newThisMonth ? (
        <div css={[styles.label, inCollection && styles.labelInCollection]}>
          New
        </div>
      ) : null}
      {disappearingThisMonth ? (
        <div css={[styles.label, inCollection && styles.labelInCollection]}>
          Disappearing
        </div>
      ) : null}
      {isCurrentlyAvailable(months, f.time) ? (
        <AvailableTag filled={inCollection} />
      ) : null}
    </div>
  );
}
