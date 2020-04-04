/** @jsx jsx */
import { jsx } from "@emotion/core";
import dynamic from "next/dynamic";
import Fuse from "fuse.js";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";
import DataFieldSelect from "../../components/primitives/DataFieldSelect";
import useLocalstorage, {
  LocalStorageKeys
} from "../../components/hooks/useLocalstorage";
import { styles as generalStyles } from "../../util/theme";
import { recipeTypeMap } from "../../util/collections";

const RecipeItem = dynamic(
  () => import("../../components/primitives/RecipeItem"),
  { ssr: false }
);

const recipeData = require("../../data/recipes.json");

const fuse = new Fuse<any[], {}>(recipeData, {
  isCaseSensitive: false,
  findAllMatches: false,
  includeMatches: false,
  includeScore: false,
  useExtendedSearch: false,
  minMatchCharLength: 1,
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  keys: ["name"]
});

export default function Collections() {
  const [search, setSearch] = useLocalstorage<string>(
    LocalStorageKeys.DIY_SEARCH,
    ""
  );
  const [collection, setCollection] = useLocalstorage<string[]>(
    LocalStorageKeys.DIY_COLLECTION,
    []
  );
  const [obtainedFrom, setObtainedFrom] = useLocalstorage<string[]>(
    LocalStorageKeys.SELECTED_DIY_LOCATION,
    []
  );
  const [types, setTypes] = useLocalstorage<string[]>(
    LocalStorageKeys.SELECTED_DIY_TYPE,
    []
  );
  const filtered = (search
    ? fuse.search(search).map<any>(d => d.item)
    : recipeData
  )
    .filter(d =>
      obtainedFrom.length
        ? obtainedFrom.some(o => d.obtainedFrom.includes(o))
        : true
    )
    .filter(d => (types.length ? types.includes(d.type) : true));
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
        <DataFieldSelect
          placeholder="Obtained from..."
          isMulti
          data={recipeData}
          field="obtainedFrom"
          allowUnselect
          value={obtainedFrom}
          onChange={setObtainedFrom}
        />
        <DataFieldSelect
          placeholder="Type..."
          isMulti
          data={recipeData}
          field="type"
          allowUnselect
          value={types}
          onChange={setTypes}
          labelMap={recipeTypeMap}
        />
        <input
          css={generalStyles.input}
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {filtered.map((recipe, i) => (
          <RecipeItem
            key={`${recipe.name}-${i}`}
            recipe={recipe}
            onClick={() => {
              setCollection(c =>
                c.includes(recipe.name)
                  ? c.filter(i => i !== recipe.name)
                  : [...c, recipe.name]
              );
            }}
            inCollection={collection.includes(recipe.name)}
          />
        ))}
      </div>
    </>
  );
}
