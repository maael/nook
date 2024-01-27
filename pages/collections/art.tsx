import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";
import Heading from "../../components/primitives/Heading";
import LoadingItem from "../../components/primitives/LoadingItem";
import SearchInput from "../../components/primitives/SearchInput";
import useLocalstorage, {
  LocalStorageKeys
} from "../../components/hooks/useLocalstorage";
import useSyncedCollection from "../../components/hooks/useSyncedCollection";
import { styles as generalStyles } from "../../util/theme";
import createFuse from "../../util/fuse";

const ArtItem = dynamic(() => import("../../components/primitives/ArtItem"), {
  ssr: false,
  loading: () => <LoadingItem size={200} />
});

const paintingsRawData = require("../../data/paintings.json");
const sculpturesRawData = require("../../data/sculptures.json");

export default function ArtPage() {
  const { t: tPaintings } = useTranslation("paintings");
  const { t: tSculptures } = useTranslation("sculptures");
  const sculpturesData = useMemo(
    () =>
      sculpturesRawData.map(d => ({
        ...d,
        name: tSculptures(d.name),
        _name: d.name,
        icon: d.name
      })),
    []
  );
  const paintingsData = useMemo(
    () =>
      paintingsRawData.map(d => ({
        ...d,
        name: tPaintings(d.name),
        _name: d.name,
        icon: d.name
      })),
    []
  );
  const fusePaintings = useMemo(
    () => createFuse(paintingsData, { keys: ["name", "realName", "artist"] }),
    [paintingsData]
  );
  const fuseSculptures = useMemo(
    () => createFuse(sculpturesData, { keys: ["name", "realName", "artist"] }),
    [sculpturesData]
  );
  const [search, setSearch] = useLocalstorage<string>(
    LocalStorageKeys.ART_SEARCH,
    ""
  );
  const filteredPaintings = search
    ? fusePaintings.search(search).map<any>(d => d.item)
    : paintingsData;
  const filteredSculptures = search
    ? fuseSculptures.search(search).map<any>(d => d.item)
    : sculpturesData;
  const [collection, setCollection] = useLocalstorage<string[]>(
    LocalStorageKeys.ART_COLLECTION,
    []
  );
  const handleCollection = useSyncedCollection(
    LocalStorageKeys.ART_COLLECTION,
    setCollection
  );
  return (
    <>
      <CollectionHeaderBar />
      <div css={generalStyles.pageWrapper}>
        <SearchInput value={search} setSearch={setSearch} />
        <Heading>Paintings</Heading>
        {filteredPaintings.map(data => (
          <ArtItem
            inCollection={collection.includes(data._name)}
            onClick={() => {
              setCollection(c =>
                c.includes(data._name)
                  ? c.filter(i => i !== data._name)
                  : [...c, data._name]
              );
              handleCollection(collection, data._name);
            }}
            key={data.name}
            item={data}
            type="painting"
          />
        ))}
        <Heading>Sculptures</Heading>
        {filteredSculptures.map(data => (
          <ArtItem
            inCollection={collection.includes(data._name)}
            onClick={() => {
              setCollection(c =>
                c.includes(data._name)
                  ? c.filter(i => i !== data._name)
                  : [...c, data._name]
              );
              handleCollection(collection, data._name);
            }}
            key={data.name}
            item={data}
            type="sculpture"
          />
        ))}
      </div>
    </>
  );
}
