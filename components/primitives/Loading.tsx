import TemtemText from "@maael/temtem-text-component";

export default ({ loading }: { loading?: boolean }) => {
  return loading ? (
    <div css={{ margin: "10px auto", textAlign: "center" }}>
      <TemtemText>Loading...</TemtemText>
    </div>
  ) : null;
};
