/** @jsx jsx */
import { jsx } from "@emotion/core";
import Link from "next/link";
import { GiFossil, GiTropicalFish, GiSpottedBug } from "react-icons/gi";
import { FaTools } from "react-icons/fa";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";

const styles = {
  link: {
    textDecoration: "none",
    display: "block",
    margin: 10,
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
            <GiTropicalFish />
            Fish
          </a>
        </Link>
        <Link href="/collections/bugs">
          <a css={styles.link}>
            <GiSpottedBug />
            Bugs
          </a>
        </Link>
        <Link href="/collections/fossils">
          <a css={styles.link}>
            <GiFossil />
            Fossils
          </a>
        </Link>
        <Link href="/collections/diy">
          <a css={styles.link}>
            <FaTools />
            DIY Recipes
          </a>
        </Link>
      </div>
    </>
  );
}
