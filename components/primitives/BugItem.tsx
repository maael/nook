import { colors } from "../../util/theme";

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
    width: 175
  }
} as const;

interface Props {
  bug: any;
  onClick: () => void;
  inCollection: boolean;
}

export default function BugItem({ bug: b, onClick, inCollection }: Props) {
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
      <img src={b.wikiImageUrl} />
      <div>{b.name}</div>
      <div>{b.location}</div>
      <div>{b.time}</div>
      <div>{b.price} Bells</div>
    </div>
  );
}
