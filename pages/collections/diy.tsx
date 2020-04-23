/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";
import SearchInput from "../../components/primitives/SearchInput";
import Heading from "../../components/primitives/Heading";
import LoadingItem from "../../components/primitives/LoadingItem";
import DataFieldSelect from "../../components/primitives/DataFieldSelect";
import useLocalstorage, {
  LocalStorageKeys
} from "../../components/hooks/useLocalstorage";
import useSyncedCollection from "../../components/hooks/useSyncedCollection";
import { styles as generalStyles } from "../../util/theme";
import { recipeTypeMap } from "../../util/collections";
import createFuse from "../../util/fuse";

const RecipeItem = dynamic(
  () => import("../../components/primitives/RecipeItem"),
  { ssr: false, loading: LoadingItem }
);

const recipeData = require("../../data/recipes.json");

export default function Collections() {
  const { t } = useTranslation("recipes");
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
  const data = useMemo(
    () =>
      recipeData.map(d => ({
        ...d,
        _name: d.name,
        name: t(d.name),
        icon: d.name
      })),
    []
  );
  const fuse = useMemo(() => createFuse(data), [data]);
  const filtered = (search ? fuse.search(search).map<any>(d => d.item) : data)
    .filter(d =>
      obtainedFrom.length
        ? obtainedFrom.some(o => d.obtainedFrom.includes(o))
        : true
    )
    .filter(d => (types.length ? types.includes(d.type) : true));
  const handleCollection = useSyncedCollection(
    LocalStorageKeys.DIY_COLLECTION,
    setCollection
  );
  return (
    <>
      <CollectionHeaderBar />
      <div css={generalStyles.pageWrapper}>
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
        <SearchInput value={search} setSearch={setSearch} />
        <Heading>
          Showing {filtered.length} of {recipeData.length}
        </Heading>
        {filtered.map((recipe, i) => (
          <RecipeItem
            key={`${recipe._name}-${i}`}
            recipe={recipe}
            onClick={() => {
              setCollection(c =>
                c.includes(recipe._name)
                  ? c.filter(i => i !== recipe._name)
                  : [...c, recipe._name]
              );
              handleCollection(collection, recipe._name);
            }}
            inCollection={collection.includes(recipe._name)}
          />
        ))}
      </div>
    </>
  );
}
