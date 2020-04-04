/** @jsx jsx */
import { jsx } from "@emotion/core";
import dynamic from "next/dynamic";
import Fuse from "fuse.js";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";
import useLocalstorage, {
  LocalStorageKeys
} from "../../components/hooks/useLocalstorage";
import { styles as generalStyles } from "../../util/theme";

const fossilData = require("../../data/fossils.json");

const FossilItem = dynamic(
  () => import("../../components/primitives/FossilItem"),
  {
    ssr: false
  }
);

const fuse = new Fuse<any[], {}>(fossilData, {
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
    LocalStorageKeys.FOSSIL_SEARCH,
    ""
  );
  const [collection, setCollection] = useLocalstorage<string[]>(
    LocalStorageKeys.FOSSIL_COLLECTION,
    []
  );
  const filtered = search
    ? fuse.search(search).map<any>(d => d.item)
    : fossilData;
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
        <input
          css={generalStyles.input}
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {filtered.map(f => (
          <FossilItem
            key={f.name}
            fossil={f}
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
      </div>
    </>
  );
}
