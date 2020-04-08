/** @jsx jsx */
import { jsx } from "@emotion/core";
import dynamic from "next/dynamic";
import NewCustomDesign from "../components/compositions/NewCustomDesign";
import useCustomDesigns from "../components/hooks/useCustomDesigns";

const CustomDesignGrid = dynamic(
  () => import("../components/compositions/CustomDesignGrid"),
  {
    ssr: false
  }
);

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
      </div>
      <CustomDesignGrid customDesigns={customDesigns} />
    </>
  );
}
