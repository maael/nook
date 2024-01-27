import {
  FaInfoCircle,
  FaUserCircle,
  FaExclamationCircle,
  FaSearch
} from "react-icons/fa";
import React from "react";
import SafeImage from "../../components/primitives/SafeImage";
import { getImageUrl } from "../../util/getImageUrl";
import { colors } from "../../util/theme";

const styles = {
  item: {
    textDecoration: "none",
    display: "inline-block",
    padding: 5,
    margin: 5,
    color: colors.blueLight,
    backgroundColor: colors.blueDark,
    borderRadius: "1em",
    width: 200,
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
  }
} as const;

interface Props {
  item: any;
  type: "painting" | "sculpture";
  inCollection: boolean;
  onClick: (item: any) => void;
}

export default function ArtItem({ item, type, inCollection, onClick }: Props) {
  return (
    <div
      css={styles.item}
      onClick={onClick}
      style={{
        color: inCollection ? colors.blueDark : colors.blueLight,
        backgroundColor: inCollection ? colors.blueLight : colors.blueDark
      }}
    >
      <div style={{ maxHeight: 200, overflow: "hidden", marginBottom: 5 }}>
        <SafeImage
          src={getImageUrl(type, item._name, "real")}
          style={{ width: "100%", borderRadius: "0.8em 0.8em 0em 0em" }}
        />
      </div>
      <div css={styles.name}>{item.name || "???"}</div>
      {item.name !== item.realName ? (
        <div css={styles.row}>
          <div>
            <FaInfoCircle style={styles.icon} />
          </div>
          <div>{item.realName || "???"}</div>
        </div>
      ) : null}
      <div css={styles.row}>
        <div>
          <FaUserCircle style={styles.icon} />
        </div>
        <div>{item.artist || "???"}</div>
      </div>
      {item.canHaveForgery ? (
        <>
          <div css={styles.row}>
            <div>
              <FaExclamationCircle style={styles.icon} />
            </div>
            <div>Can be a forgery</div>
          </div>
          {item.clues.length ? (
            <div css={styles.row}>
              <div>
                <FaSearch style={styles.icon} />
              </div>
              <div>{item.clues.join(", ")}</div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
