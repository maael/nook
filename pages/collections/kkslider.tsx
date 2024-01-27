/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React from "react";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";

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
        Hey
      </div>
    </>
  );
}
