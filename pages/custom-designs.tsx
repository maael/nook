import { jsx } from "@emotion/react";
import React from "react";
import { useState, useMemo } from "react";
import { FaHeart, FaUser } from "react-icons/fa";
import dynamic from "next/dynamic";
import NewCustomDesign from "../components/compositions/NewCustomDesign";
import useCustomDesigns from "../components/hooks/useCustomDesigns";
import useSavedCustomDesigns from "../components/hooks/useSavedCustomDesigns";
import useJWT from "../components/hooks/useJWT";
import CheckboxPill from "../components/primitives/CheckboxPill";
import { styles } from "../util/theme";
import createFuse from "../util/fuse";

const CustomDesignGrid = dynamic(
  () => import("../components/compositions/CustomDesignGrid"),
  {
    ssr: false
  }
);

export default function Collections() {
  const jwt = useJWT();
  const [customDesigns, setCustomDesigns] = useCustomDesigns();
  const [savedCustomDesigns, setSavedCustomDesigns] = useSavedCustomDesigns();
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const [mine, setMine] = useState(false);
  const [favourites, setFavourites] = useState(false);
  const fuseSearch = useMemo(
    () =>
      createFuse(customDesigns, {
        keys: ["title", "tags", "user.discordName", "user.redditName", "type"]
      }),
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
  const filtered = useMemo(() => {
    const savedIds = savedCustomDesigns.map(
      ({ customDesign }) => customDesign._id
    );
    return (search
      ? fuseSearch.search(search).map(({ item }) => item)
      : customDesigns
    ).filter(v => {
      const mineCheck = mine ? jwt && v.user._id === jwt._id : true;
      const favouriteCheck = favourites ? savedIds.includes(v._id) : true;
      return mineCheck && favouriteCheck;
    });
  }, [search, customDesigns, savedCustomDesigns, mine, favourites]);
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
        <div
          css={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CheckboxPill
            icon={<FaUser />}
            checked={mine}
            onChange={() => {
              setMine(s => !s);
              setFavourites(false);
            }}
            label={"Only Mine"}
          />
          <CheckboxPill
            icon={<FaHeart />}
            checked={favourites}
            onChange={() => {
              setFavourites(s => !s);
              setMine(false);
            }}
            label={"Only Favourites"}
          />
        </div>
      </div>
      <CustomDesignGrid
        customDesigns={filtered}
        savedCustomDesigns={savedCustomDesigns}
        onSaveToggle={async savedId => {
          const existing = savedCustomDesigns.find(
            ({ customDesign }) => customDesign._id === savedId
          );
          const toggle = existing ? "deleting" : "saving";
          if (toggle === "deleting") {
            setSavedCustomDesigns(c =>
              c.filter(({ _id }) => _id !== existing._id)
            );
          }

          try {
            let res;
            if (toggle === "saving") {
              res = await fetch(`/api/db/saved/custom-designs`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  customDesignId: savedId
                })
              });
            } else {
              res = await fetch(
                `/api/db/saved/custom-designs/${existing._id}`,
                {
                  method: "DELETE"
                }
              );
            }
            if (!res.ok) {
              throw new Error("Unexpected error");
            }
            if (toggle === "saving") {
              const result = await res.json();
              setSavedCustomDesigns(c => c.concat(result));
            }
          } catch (e) {
            console.error(e);
            if (toggle === "deleting") {
              setSavedCustomDesigns(c => c.concat(existing));
            }
          }
        }}
        onDelete={async deleted => {
          setCustomDesigns(c => c.filter(({ _id }) => _id !== deleted._id));
          try {
            const res = await fetch(`/api/db/custom-designs/${deleted._id}`, {
              method: "DELETE"
            });
            if (!res.ok) {
              throw new Error("Unexpected error");
            }
          } catch (e) {
            console.error(e);
            setCustomDesigns(c => c.concat(deleted));
          }
        }}
      />
    </>
  );
}
