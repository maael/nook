/** @jsx jsx */
import { jsx } from "@emotion/core";
import dynamic from "next/dynamic";
import Fuse from "fuse.js";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";
import MonthSelect from "../../components/primitives/MonthSelect";
import HemisphereSelect from "../../components/primitives/HemisphereSelect";
import FilterableItems from "../../components/compositions/FilterableItems";
import useLocalstorage, {
  LocalStorageKeys
} from "../../components/hooks/useLocalstorage";
import { colors, styles as generalStyles } from "../../util/theme";
import {
  CURRENT_MONTH,
  isAvailable,
  isAlwaysAvailable
} from "../../util/collections";

const FishItem = dynamic(() => import("../../components/primitives/FishItem"), {
  ssr: false
});
const LocationSelect = dynamic(
  () => import("../../components/primitives/LocationSelect"),
  { ssr: false }
);
const FishSizeSelect = dynamic(
  () => import("../../components/primitives/FishSizeSelect"),
  { ssr: false }
);

const fishData = require("../../data/fish.json");

const fuse = new Fuse<any[], {}>(fishData, {
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

const styles = {
  container: {
    margin: "0px auto",
    textAlign: "center",
    padding: 10,
    maxWidth: 1200
  },
  header: {
    marginTop: 10,
    marginBottom: 5,
    color: colors.blueDark
  }
} as const;

interface Filter {
  month?: number;
  locations: string[];
  sizes: string[];
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
      return filter.sizes.length > 0
        ? filter.sizes.includes(d.shadowSize)
        : true;
    });
}

export default function Collections() {
  const [month, setMonth] = useLocalstorage<number | undefined>(
    LocalStorageKeys.SELECTED_MONTH,
    CURRENT_MONTH
  );
  const [locations, setLocations] = useLocalstorage<string[]>(
    LocalStorageKeys.SELECTED_FISH_LOCATION,
    []
  );
  const [sizes, setSizes] = useLocalstorage<string[]>(
    LocalStorageKeys.SELECTED_FISH_SIZE,
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
  const [collection, setCollection] = useLocalstorage<string[]>(
    LocalStorageKeys.FISH_COLLECTION,
    []
  );
  const filtered = applyFilter(
    search ? fuse.search(search).map<any>(d => d.item) : fishData,
    hemisphere,
    { month, locations, sizes }
  );
  return (
    <>
      <CollectionHeaderBar />
      <div css={styles.container}>
        <HemisphereSelect value={hemisphere} onChange={setHemisphere} />
        <MonthSelect value={month} onChange={setMonth} />
        <LocationSelect
          data={fishData}
          values={locations}
          onChange={setLocations}
        />
        <FishSizeSelect data={fishData} values={sizes} onChange={setSizes} />
        <input
          css={generalStyles.input}
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div>
          {filtered.length} of {fishData.length}
        </div>
        <FilterableItems
          month={month}
          filtered={filtered}
          hemisphere={hemisphere}
          generateItem={data => (
            <FishItem
              key={data.name}
              fish={data}
              onClick={() => {
                setCollection(c =>
                  c.includes(data.name)
                    ? c.filter(i => i !== data.name)
                    : [...c, data.name]
                );
              }}
              inCollection={collection.includes(data.name)}
            />
          )}
        />
      </div>
    </>
  );
}
