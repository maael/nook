/** @jsx jsx */
import { jsx } from "@emotion/core";
import { GiSwapBag } from "react-icons/gi";
import { colors } from "../../util/theme";

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
      <img src={f.wikiImageUrl} />
      <div>{f.name}</div>
      <div>
        {f.sellPrice} <GiSwapBag />
      </div>
    </div>
  );
}
