/** @jsx jsx */
import { jsx } from "@emotion/core";
import Link from "next/link";
import { GiFossil, GiTropicalFish, GiSpottedBug } from "react-icons/gi";
import { FaTools } from "react-icons/fa";
import Heading from "../../components/primitives/Heading";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";

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
        <Link href="/collections/fish">
          <a css={styles.link}>
            <Heading>
              <GiTropicalFish style={{ marginRight: 5 }} />
              Fish
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
      </div>
    </>
  );
}
