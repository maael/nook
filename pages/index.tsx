/** @jsx jsx */
import { jsx } from "@emotion/core";
import { colors } from "../util/theme";

const styles = {
  link: {
    display: "block",
    textDecoration: "none",
    margin: 5,
    color: colors.brown
  }
};

export default function Home() {
  return (
    <div
      css={{
        margin: "0px auto",
        textAlign: "center",
        padding: 10,
        maxWidth: 1000
      }}
    >
      <img src="/images/tom-nook.png" css={{ height: 200, marginTop: 20 }} />
      <div
        css={{
          backgroundColor: colors.offWhite,
          color: colors.brownDark,
          width: 400,
          maxWidth: "80vw",
          margin: "10px auto",
          padding: 20,
          borderRadius: "1em"
        }}
      >
        <div>Welcome!</div>
        <div css={{ margin: "10px 0px 5px 0px" }}>
          Here at Nook Services, you can do many things, including:
          <a css={styles.link} href="/collections">
            Track your bug, fish, fossil, and recipe collections
          </a>
          <a css={styles.link} href="/custom-designs">
            Search and favourtie custom designs
          </a>
        </div>
        <div css={{ margin: "10px 0px 5px 0px" }}>
          If you want to, you can sign up with reddit or discord account, to:
          <a css={styles.link} href="/collections">
            Share your collections with others
          </a>
          <a css={styles.link} href="/custom-designs">
            Share your own custom designs
          </a>
        </div>
      </div>
    </div>
  );
}
