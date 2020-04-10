import { createRef } from "react";
import { GiSwapBag } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import { FaClock, FaStar } from "react-icons/fa";
import AvailableTag from "./AvailableTag";
import {
  isDisappearingThisMonth,
  isNewThisMonth,
  isCurrentlyAvailable
} from "../../util/collections";
import { colors } from "../../util/theme";
import { getImageUrl } from "../../util/getImageUrl";

const styles = {
  bugItem: {
    textDecoration: "none",
    display: "inline-block",
    padding: 5,
    margin: 5,
    color: colors.blueLight,
    backgroundColor: colors.blueDark,
    cursor: "pointer",
    borderRadius: "1em",
    width: 150,
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
  bug: any;
  month?: number;
  hemisphere: string;
  onClick: () => void;
  inCollection: boolean;
}

export default function BugItem({
  bug: b,
  onClick,
  inCollection,
  month,
  hemisphere
}: Props) {
  const imgRef = createRef<HTMLImageElement>();
  const months =
    hemisphere === "Northern Hemisphere" ? b.northernMonths : b.southernMonths;
  const newThisMonth =
    month !== undefined ? isNewThisMonth(months, month) : false;
  const disappearingThisMonth =
    month !== undefined ? isDisappearingThisMonth(months, month) : false;
  return (
    <div
      key={b.name}
      onClick={onClick}
      css={styles.bugItem}
      style={{
        color: inCollection ? colors.blueDark : colors.blueLight,
        backgroundColor: inCollection ? colors.blueLight : colors.blueDark
      }}
    >
      <img
        src={getImageUrl("bug", b.name)}
        onError={() => {
          if (imgRef.current) imgRef.current.src = "/images/missing.png";
        }}
      />
      <div css={[styles.row, styles.center, styles.name]}>{b.name}</div>
      <div css={styles.row}>
        <div>
          <MdLocationOn style={styles.icon} />
        </div>
        <div>{b.location}</div>
      </div>
      <div css={styles.row}>
        <div>
          <FaClock style={styles.icon} />
        </div>
        <div>{b.time}</div>
      </div>
      <div css={styles.row}>
        <div>
          <GiSwapBag style={styles.icon} />
        </div>
        <div>{b.price}</div>
      </div>
      <div css={styles.row}>
        <div>
          <FaStar style={styles.icon} />
        </div>
        <div>{b.rarity}</div>
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
      {isCurrentlyAvailable(months, b.time) ? (
        <AvailableTag filled={inCollection} />
      ) : null}
    </div>
  );
}
