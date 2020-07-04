/** @jsx jsx */
import { jsx } from "@emotion/core";
import Link from "next/link";
import { GiFossil, GiTropicalFish, GiSpottedBug } from "react-icons/gi";
import { FaTools, FaImage, FaSwimmer } from "react-icons/fa";
import Heading from "../../components/primitives/Heading";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";
import { colors } from "../../util/theme";

const styles = {
  link: {
    textDecoration: "none",
    display: "block",
    cursor: "pointer"
  }
};

export default function Collections() {
  return (
    <>
      <CollectionHeaderBar />
      <div
        css={{
          margin: "0px auto",
          textAlign: "center",
          padding: 10,
          maxWidth: 1000
        }}
      >
        <div>
          <div
            css={{
              backgroundColor: colors.offWhite,
              color: colors.brownDark,
              display: "inline-block",
              width: 400,
              maxWidth: "80vw",
              margin: "10px auto",
              padding: 20,
              borderRadius: "1em"
            }}
          >
            Track your progress on collections here!
          </div>
        </div>
        <Link href="/collections/fish">
          <a css={styles.link}>
            <Heading>
              <GiTropicalFish style={{ marginRight: 5 }} />
              Fish
            </Heading>
          </a>
        </Link>
        <Link href="/collections/deepsea">
          <a css={styles.link}>
            <Heading>
              <FaSwimmer style={{ marginRight: 5 }} />
              Deep Sea
            </Heading>
          </a>
        </Link>
        <Link href="/collections/bugs">
          <a css={styles.link}>
            <Heading>
              <GiSpottedBug style={{ marginRight: 5 }} />
              Bugs
            </Heading>
          </a>
        </Link>
        <Link href="/collections/fossils">
          <a css={styles.link}>
            <Heading>
              <GiFossil style={{ marginRight: 5 }} />
              Fossils
            </Heading>
          </a>
        </Link>
        <Link href="/collections/diy">
          <a css={styles.link}>
            <Heading>
              <FaTools style={{ marginRight: 5 }} />
              DIY Recipes
            </Heading>
          </a>
        </Link>
        <Link href="/collections/art">
          <a css={styles.link}>
            <Heading>
              <FaImage style={{ marginRight: 5 }} />
              Art
            </Heading>
          </a>
        </Link>
      </div>
    </>
  );
}
