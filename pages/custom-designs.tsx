/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import NewCustomDesign from "../components/compositions/NewCustomDesign";
import useCustomDesigns from "../components/hooks/useCustomDesigns";
import { styles } from "../util/theme";
import createFuse from "../util/fuse";

const CustomDesignGrid = dynamic(
  () => import("../components/compositions/CustomDesignGrid"),
  {
    ssr: false
  }
);

export default function Collections() {
  const [customDesigns, setCustomDesigns] = useCustomDesigns();
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const fuseSearch = useMemo(
    () => createFuse(customDesigns, { keys: ["title"] }),
    [customDesigns]
  );
  const existingTags = useMemo(
    () => [
      ...new Set(
        customDesigns.reduce<string[]>((acc, { tags }) => acc.concat(tags), [])
      )
    ],
    [customDesigns]
  );
  const filtered = useMemo(
    () =>
      search
        ? fuseSearch.search(search).map(({ item }) => item)
        : customDesigns,
    [search, customDesigns]
  );
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
        {adding ? (
          <NewCustomDesign
            onCreate={created => setCustomDesigns(c => [...c, created])}
            existingTags={existingTags}
            onClose={() => setAdding(false)}
          />
        ) : (
          <button css={styles.button} onClick={() => setAdding(true)}>
            Create New
          </button>
        )}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          css={styles.input}
          style={{ marginTop: 10 }}
          placeholder={
            customDesigns.length
              ? `Search ${customDesigns.length} custom designs...`
              : "Loading..."
          }
        />
      </div>
      <CustomDesignGrid
        customDesigns={filtered}
        onDelete={async deleted => {
          try {
            const res = await fetch(`/api/db/custom-designs/${deleted._id}`, {
              method: "DELETE"
            });
            if (res.ok) {
              setCustomDesigns(c => c.filter(({ _id }) => _id !== deleted._id));
            }
          } catch (e) {
            console.error(e);
          }
        }}
      />
    </>
  );
}
