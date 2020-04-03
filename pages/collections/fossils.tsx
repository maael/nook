/** @jsx jsx */
import { jsx } from "@emotion/core";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";
import FossilItem from "../../components/primitives/FossilItem";

const fossilData = require("../../data/fossils.json");

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
        {fossilData.map(f => (
          <FossilItem
            key={f.name}
            fossil={f}
            onClick={() => undefined}
            inCollection={false}
          />
        ))}
      </div>
    </>
  );
}
