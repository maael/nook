/** @jsx jsx */
import { jsx } from "@emotion/core";
import NewCustomDesign from "../components/compositions/NewCustomDesign";

export default function Collections() {
  return (
    <>
      <div
        css={{
          margin: "0px auto",
          textAlign: "center",
          padding: 10,
          maxWidth: 1000
        }}
      >
        <NewCustomDesign />
      </div>
    </>
  );
}
