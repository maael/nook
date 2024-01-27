/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React from "react";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";
import SearchInput from "../../components/primitives/SearchInput";
import MonthSelect from "../../components/primitives/MonthSelect";
import HemisphereSelect from "../../components/primitives/HemisphereSelect";
import Heading from "../../components/primitives/Heading";
import LoadingItem from "../../components/primitives/LoadingItem";
import FilterableItems from "../../components/compositions/FilterableItems";
import useLocalstorage, {
  LocalStorageKeys
} from "../../components/hooks/useLocalstorage";
import useSort from "../../components/hooks/useSort";
import useSyncedCollection from "../../components/hooks/useSyncedCollection";
import { styles as generalStyles } from "../../util/theme";
import {
  CURRENT_MONTH,
  isAvailable,
  isAlwaysAvailable,
  fishSizeMap
} from "../../util/collections";
import createFuse from "../../util/fuse";
import { SortOption } from "../../types";

const Item = dynamic(() => import("../../components/primitives/DeepseaItem"), {
  ssr: false,
  loading: () => <LoadingItem />
});
const DataFieldSelect = dynamic(
  () => import("../../components/primitives/DataFieldSelect"),
  { ssr: false }
);
const SortSelect = dynamic(
  () => import("../../components/primitives/SortSelect"),
  { ssr: false }
);

const deepseaData = require("../../data/deepsea.json");

interface Filter {
  month?: number;
  sizes: string[];
  rarity: string[];
}

function getMonths(d: any, hemisphere: string) {
  return hemisphere === "Northern Hemisphere"
    ? d.northernMonths
    : d.southernMonths;
}

function applyFilter(data: any[], hemisphere: string, filter: Filter) {
  return data
    .filter(d => {
      return filter.month
        ? isAlwaysAvailable(getMonths(d, hemisphere)) ||
            isAvailable(getMonths(d, hemisphere), filter.month)
        : true;
    })
    .filter(d => {
      return filter.sizes.length > 0
        ? filter.sizes.includes(d.shadowSize)
        : true;
    })
    .filter(d => {
      return filter.rarity.length > 0 ? filter.rarity.includes(d.rarity) : true;
    });
}

export default function Collections() {
  const { t } = useTranslation("fish");
  const [month, setMonth] = useLocalstorage<number | undefined>(
    LocalStorageKeys.SELECTED_MONTH,
    CURRENT_MONTH
  );
  const [sizes, setSizes] = useLocalstorage<string[]>(
    LocalStorageKeys.SELECTED_DEEPSEA_SIZE,
    []
  );
  const [search, setSearch] = useLocalstorage<string>(
    LocalStorageKeys.FISH_SEARCH,
    ""
  );
  const [hemisphere, setHemisphere] = useLocalstorage<string>(
    LocalStorageKeys.SELECTED_HEMISPHERE,
    "Northern Hemisphere"
  );
  const [rarity, setRarity] = useLocalstorage<string[]>(
    LocalStorageKeys.SELECTED_DEEPSEA_RARITY,
    []
  );
  const [collection, setCollection] = useLocalstorage<string[]>(
    LocalStorageKeys.DEEPSEA_COLLECTION,
    []
  );
  const [sort, setSort] = useLocalstorage<SortOption | undefined>(
    LocalStorageKeys.SELECTED_SORT,
    undefined
  );
  const data = useMemo(
    () =>
      deepseaData.map(d => ({
        ...d,
        _name: d.name,
        name: t(d.name),
        icon: d.name
      })),
    []
  );
  const fuse = useMemo(() => createFuse(data), [data]);
  const filtered = applyFilter(
    search ? fuse.search(search).map<any>(d => d.item) : data,
    hemisphere,
    { month, sizes, rarity }
  );
  const sorted = useSort(filtered, sort);
  const handleCollection = useSyncedCollection(
    LocalStorageKeys.DEEPSEA_COLLECTION,
    setCollection
  );
  return (
    <>
      <CollectionHeaderBar />
      <div css={generalStyles.pageWrapper}>
        <HemisphereSelect value={hemisphere} onChange={setHemisphere} />
        <MonthSelect value={month} onChange={setMonth} />
        <DataFieldSelect
          placeholder="Shadow size..."
          isMulti
          value={sizes}
          onChange={setSizes}
          data={deepseaData}
          field="shadowSize"
        />
        <DataFieldSelect
          placeholder="Rarity..."
          isMulti
          value={rarity}
          onChange={setRarity}
          data={deepseaData}
          field="rarity"
        />
        <SearchInput value={search} setSearch={setSearch} />
        <SortSelect value={sort} onChange={setSort} />
        <Heading>
          Showing {filtered.length} of {deepseaData.length}
        </Heading>
        <FilterableItems
          month={month}
          filtered={sorted}
          hemisphere={hemisphere}
          generateItem={data => (
            <Item
              key={data._name}
              fish={data}
              hemisphere={hemisphere}
              month={month}
              onClick={() => {
                setCollection(c =>
                  c.includes(data._name)
                    ? c.filter(i => i !== data._name)
                    : [...c, data._name]
                );
                handleCollection(collection, data._name);
              }}
              inCollection={collection.includes(data._name)}
            />
          )}
        />
      </div>
    </>
  );
}
