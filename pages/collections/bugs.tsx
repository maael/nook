/** @jsx jsx */
import { jsx } from "@emotion/core";
import dynamic from "next/dynamic";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";
import Fuse from "fuse.js";
import MonthSelect from "../../components/primitives/MonthSelect";
import HemisphereSelect from "../../components/primitives/HemisphereSelect";
import FilterableItems from "../../components/compositions/FilterableItems";
import useLocalstorage, {
  LocalStorageKeys
} from "../../components/hooks/useLocalstorage";
import {
  CURRENT_MONTH,
  isAvailable,
  isAlwaysAvailable
} from "../../util/collections";
import { colors, styles as generalStyles } from "../../util/theme";

const BugItem = dynamic(() => import("../../components/primitives/BugItem"), {
  ssr: false
});

const DataFieldSelect = dynamic(
  () => import("../../components/primitives/DataFieldSelect"),
  {
    ssr: false
  }
);

const bugsData = require("../../data/bugs.json");

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

const fuse = new Fuse<any[], {}>(bugsData, {
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

interface Filter {
  month?: number;
  locations: string[];
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
    });
}

export default function Collections() {
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
  const [collection, setCollection] = useLocalstorage<string[]>(
    LocalStorageKeys.BUGS_COLLECTION,
    []
  );
  const filtered = applyFilter(
    search ? fuse.search(search).map<any>(d => d.item) : bugsData,
    hemisphere,
    { month, locations }
  );
  return (
    <>
      <CollectionHeaderBar />
      <div css={styles.container}>
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
        <input
          css={generalStyles.input}
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <FilterableItems
          month={month}
          filtered={filtered}
          hemisphere={hemisphere}
          generateItem={data => (
            <BugItem
              key={data.name}
              bug={data}
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
