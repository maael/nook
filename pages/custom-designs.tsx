/** @jsx jsx */
import { jsx } from "@emotion/core";
import NewCustomDesign from "../components/compositions/NewCustomDesign";
import CustomDesignItem from "../components/primitives/CustomDesignItem";
import useCustomDesigns from "../components/hooks/useCustomDesigns";

export default function Collections() {
  const [customDesigns, setCustomDesigns] = useCustomDesigns();
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
        <NewCustomDesign
          onCreate={created => setCustomDesigns(c => [...c, created])}
        />
        <div css={{ marginTop: 10 }}>
          {customDesigns.map(customDesign => (
            <CustomDesignItem
              customDesign={customDesign}
              key={customDesign.s3Url}
            />
          ))}
        </div>
      </div>
    </>
  );
}
