/** @jsx jsx */
import { jsx } from "@emotion/core";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";
import SearchInput from "../../components/primitives/SearchInput";
import Heading from "../../components/primitives/Heading";
import LoadingItem from "../../components/primitives/LoadingItem";
import useLocalstorage, {
  LocalStorageKeys
} from "../../components/hooks/useLocalstorage";
import useSyncedCollection from "../../components/hooks/useSyncedCollection";
import { styles as generalStyles } from "../../util/theme";
import createFuse from "../../util/fuse";

const fossilData = require("../../data/fossils.json");

const FossilItem = dynamic(
  () => import("../../components/primitives/FossilItem"),
  {
    ssr: false,
    loading: () => <LoadingItem />
  }
);

export default function Collections() {
  const { t } = useTranslation("fossils");
  const [search, setSearch] = useLocalstorage<string>(
    LocalStorageKeys.FOSSIL_SEARCH,
    ""
  );
  const [collection, setCollection] = useLocalstorage<string[]>(
    LocalStorageKeys.FOSSIL_COLLECTION,
    []
  );
  const data = useMemo(
    () =>
      fossilData.map(d => ({
        ...d,
        _name: d.name,
        name: t(d.name),
        icon: d.name
      })),
    []
  );
  const fuse = useMemo(() => createFuse(data), [data]);
  const filtered = search ? fuse.search(search).map<any>(d => d.item) : data;
  const handleCollection = useSyncedCollection(
    LocalStorageKeys.FOSSIL_COLLECTION,
    setCollection
  );
  return (
    <>
      <CollectionHeaderBar />
      <div css={generalStyles.pageWrapper}>
        <SearchInput value={search} setSearch={setSearch} />
        <Heading>
          Showing {filtered.length} of {fossilData.length}
        </Heading>
        {filtered.map(f => (
          <FossilItem
            key={f._name}
            fossil={f}
            onClick={() => {
              setCollection(c =>
                c.includes(f._name)
                  ? c.filter(i => i !== f._name)
                  : [...c, f._name]
              );
              handleCollection(collection, f._name);
            }}
            inCollection={collection.includes(f._name)}
          />
        ))}
      </div>
    </>
  );
}
