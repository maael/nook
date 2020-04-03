/** @jsx jsx */
import { jsx } from "@emotion/core";
import dynamic from "next/dynamic";
import Fuse from "fuse.js";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";
import MonthSelect, { MONTHS } from "../../components/primitives/MonthSelect";
import FishItem from "../../components/primitives/FishItem";
import useLocalstorage, {
  LocalStorageKeys
} from "../../components/hooks/useLocalstorage";
import { colors, styles as generalStyles } from "../../util/theme";
import {
  CURRENT_MONTH,
  isAvailable,
  isAlwaysAvailable
} from "../../util/collections";

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

function applyFilter(data: any[], filter: Filter) {
  return data
    .filter(d => {
      return filter.month
        ? isAlwaysAvailable(d.northernMonths) ||
            isAvailable(d.northernMonths, filter.month)
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
  const [collection, setCollection] = useLocalstorage<string[]>(
    LocalStorageKeys.FISH_COLLECTION,
    []
  );
  const filtered = applyFilter(
    search ? fuse.search(search).map<any>(d => d.item) : fishData,
    { month, locations, sizes }
  );
  return (
    <>
      <CollectionHeaderBar />
      <div css={styles.container}>
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
        {month ? (
          <>
            <div css={styles.header}>Available in {MONTHS[month]}</div>
            {filtered
              .filter(
                ({ northernMonths }) =>
                  !isAlwaysAvailable(northernMonths) &&
                  isAvailable(northernMonths, month)
              )
              .map(f => (
                <FishItem
                  key={f.name}
                  fish={f}
                  onClick={() => {
                    setCollection(c =>
                      c.includes(f.name)
                        ? c.filter(i => i !== f.name)
                        : [...c, f.name]
                    );
                  }}
                  inCollection={collection.includes(f.name)}
                />
              ))}
            <div css={styles.header}>Always available</div>
            {filtered
              .filter(({ northernMonths }) => isAlwaysAvailable(northernMonths))
              .map(f => (
                <FishItem
                  key={f.name}
                  fish={f}
                  onClick={() => {
                    setCollection(c =>
                      c.includes(f.name)
                        ? c.filter(i => i !== f.name)
                        : [...c, f.name]
                    );
                  }}
                  inCollection={collection.includes(f.name)}
                />
              ))}
          </>
        ) : (
          filtered.map(f => (
            <FishItem
              key={f.name}
              fish={f}
              onClick={() => {
                setCollection(c =>
                  c.includes(f.name)
                    ? c.filter(i => i !== f.name)
                    : [...c, f.name]
                );
              }}
              inCollection={collection.includes(f.name)}
            />
          ))
        )}
      </div>
    </>
  );
}
