/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React from "react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";
import Heading from "../../components/primitives/Heading";
import SearchInput from "../../components/primitives/SearchInput";
import MonthSelect from "../../components/primitives/MonthSelect";
import HemisphereSelect from "../../components/primitives/HemisphereSelect";
import LoadingItem from "../../components/primitives/LoadingItem";
import FilterableItems from "../../components/compositions/FilterableItems";
import useLocalstorage, {
  LocalStorageKeys
} from "../../components/hooks/useLocalstorage";
import useSyncedCollection from "../../components/hooks/useSyncedCollection";
import useSort from "../../components/hooks/useSort";
import {
  CURRENT_MONTH,
  isAvailable,
  isAlwaysAvailable
} from "../../util/collections";
import { styles as generalStyles } from "../../util/theme";
import createFuse from "../../util/fuse";
import { SortOption } from "../../types";

const BugItem = dynamic(() => import("../../components/primitives/BugItem"), {
  ssr: false,
  loading: () => <LoadingItem />
});

const DataFieldSelect = dynamic(
  () => import("../../components/primitives/DataFieldSelect"),
  {
    ssr: false
  }
);
const SortSelect = dynamic(
  () => import("../../components/primitives/SortSelect"),
  { ssr: false }
);

const bugsData = require("../../data/bugs.json");
interface Filter {
  month?: number;
  locations: string[];
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
      return filter.locations.length > 0
        ? filter.locations.includes(d.location)
        : true;
    })
    .filter(d => {
      return filter.rarity.length > 0 ? filter.rarity.includes(d.rarity) : true;
    });
}

export default function Collections() {
  const { t } = useTranslation("bugs");
  const [month, setMonth] = useLocalstorage<number | undefined>(
    LocalStorageKeys.SELECTED_MONTH,
    CURRENT_MONTH
  );
  const [locations, setLocations] = useLocalstorage<string[]>(
    LocalStorageKeys.SELECTED_BUGS_LOCATION,
    []
  );
  const [search, setSearch] = useLocalstorage<string>(
    LocalStorageKeys.BUGS_SEARCH,
    ""
  );
  const [hemisphere, setHemisphere] = useLocalstorage<string>(
    LocalStorageKeys.SELECTED_HEMISPHERE,
    "Northern Hemisphere"
  );
  const [rarity, setRarity] = useLocalstorage<string[]>(
    LocalStorageKeys.SELECTED_BUGS_RARITY,
    []
  );
  const [collection, setCollection] = useLocalstorage<string[]>(
    LocalStorageKeys.BUGS_COLLECTION,
    []
  );
  const [sort, setSort] = useLocalstorage<SortOption | undefined>(
    LocalStorageKeys.SELECTED_SORT,
    undefined
  );
  const data = useMemo(
    () =>
      bugsData.map(d => ({
        ...d,
        name: t(d.name),
        _name: d.name,
        icon: d.name
      })),
    []
  );
  const fuse = useMemo(() => createFuse(data), [data]);
  const filtered = applyFilter(
    search ? fuse.search(search).map<any>(d => d.item) : data,
    hemisphere,
    { month, locations, rarity }
  );
  const sorted = useSort(filtered, sort);
  const handleCollection = useSyncedCollection(
    LocalStorageKeys.BUGS_COLLECTION,
    setCollection
  );
  return (
    <>
      <CollectionHeaderBar />
      <div css={generalStyles.pageWrapper}>
        <HemisphereSelect value={hemisphere} onChange={setHemisphere} />
        <MonthSelect value={month} onChange={setMonth} />
        <DataFieldSelect
          placeholder="Location..."
          isMulti
          value={locations}
          onChange={setLocations}
          data={bugsData}
          field="location"
        />
        <DataFieldSelect
          placeholder="Rarity..."
          isMulti
          value={rarity}
          onChange={setRarity}
          data={bugsData}
          field="rarity"
        />
        <SearchInput value={search} setSearch={setSearch} />
        <SortSelect value={sort} onChange={setSort} />
        <Heading>
          Showing {sorted.length} of {bugsData.length}
        </Heading>
        <FilterableItems
          month={month}
          filtered={sorted}
          hemisphere={hemisphere}
          generateItem={data => (
            <BugItem
              key={data._name}
              bug={data}
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
