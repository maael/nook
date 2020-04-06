/** @jsx jsx */
import { jsx } from "@emotion/core";
import EventsHeaderBar from "../../components/compositions/EventsHeaderBar";
import dynamic from "next/dynamic";
import useLocalstorage, {
  LocalStorageKeys
} from "../../components/hooks/useLocalstorage";
import useSyncedCollection from "../../components/hooks/useSyncedCollection";
import { styles, colors } from "../../util/theme";
import Heading from "../../components/primitives/Heading";

const RecipeItem = dynamic(
  () => import("../../components/primitives/RecipeItem"),
  { ssr: false }
);

const recipes = require("../../data/recipes.json");
const bunnyRecipes = recipes
  .filter(r => {
    return (
      r.obtainedFrom.includes("Bunny Day") ||
      r.materials.some(m => m.material.endsWith(" egg"))
    );
  })
  .filter(Boolean);

export default function() {
  const [collection, setCollection] = useLocalstorage<string[]>(
    LocalStorageKeys.DIY_COLLECTION,
    []
  );
  const handleCollection = useSyncedCollection(
    LocalStorageKeys.DIY_COLLECTION,
    setCollection
  );
  return (
    <>
      <EventsHeaderBar />
      <div css={styles.pageWrapper}>
        <Heading size={40}>🐰 Bunny Day 🐰</Heading>
        <Heading>April 1st - April 12th</Heading>
        <Heading>Recipes</Heading>
        {bunnyRecipes.map(r => (
          <RecipeItem
            key={r.name}
            recipe={r}
            inCollection={collection.includes(r.name)}
            onClick={() => {
              setCollection(c =>
                c.includes(r.name)
                  ? c.filter(i => i !== r.name)
                  : [...c, r.name]
              );
              handleCollection(collection, r.name);
            }}
          />
        ))}
        <Heading>Total Materials</Heading>
        {Object.entries(
          bunnyRecipes
            .reduce((acc, { materials }) => [...acc, ...materials], [])
            .reduce((acc, { material, quantity }) => {
              const clean = material
                .toLowerCase()
                .trim()
                .replace(/​/g, "");
              const captialised = `${clean
                .slice(0, 1)
                .toUpperCase()}${clean.slice(1)}`;
              return {
                ...acc,
                [captialised]: (acc[captialised] || 0) + quantity
              };
            }, {})
        ).map(([k, v]) => (
          <div
            key={k}
            css={{
              backgroundColor: colors.blueDark,
              display: "inline-block",
              borderRadius: "0.3em",
              margin: 5,
              padding: 5
            }}
          >
            {k}: {v}
          </div>
        ))}
      </div>
    </>
  );
}
