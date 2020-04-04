/** @jsx jsx */
import { jsx } from "@emotion/core";
import dynamic from "next/dynamic";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";
import useLocalstorage, {
  LocalStorageKeys
} from "../../components/hooks/useLocalstorage";
import { styles as generalStyles } from "../../util/theme";
import createFuse from "../../util/fuse";

const fossilData = require("../../data/fossils.json");

const FossilItem = dynamic(
  () => import("../../components/primitives/FossilItem"),
  {
    ssr: false
  }
);

const fuse = createFuse(fossilData);

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
      <div css={generalStyles.pageWrapper}>
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
