import { colors } from "../../util/theme";

const styles = {
  bugItem: {
    textDecoration: "none",
    display: "inline-block",
    padding: 5,
    margin: 5,
    color: colors.blueLight,
    backgroundColor: colors.blueDark,
    borderRadius: "1em"
  }
} as const;

export default function BugItem({ bug: b }: any) {
  return (
    <a key={b.name} href={b.wikiUrl} css={styles.bugItem}>
      <img src={b.wikiImageUrl} />
      <div>{b.name}</div>
      <div>{b.location}</div>
      <div>{b.time}</div>
      <div>{b.price} Bells</div>
    </a>
  );
}
