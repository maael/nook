/** @jsx jsx */
import { jsx } from "@emotion/core";
import CollectionHeaderBar from '../../components/compositions/CollectionHeaderBar'
import {colors} from '../../util/theme';

const fishData = require('../../data/fish.json');

const monthNum = (new Date()).getMonth();

function isAvailable (months: Record<string, boolean>) {
  return Object.values(months)[monthNum];
}

export default function Collections() {
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
      <div css={{marginTop: 5, marginBottom: 10, color: colors.blueDark}}>Currently Available</div>
      {fishData.filter(({northernMonths}) => isAvailable(northernMonths)).map((f) => (
        <FishItem key={f.name} fish={f} />
      ))}
      <div css={{marginTop: 10, marginBottom: 5, color: colors.blueDark}}>All</div>
      {fishData.map((f) => (
        <FishItem key={f.name} fish={f} />
      ))}
    </div>
    </>
  );
}

function FishItem ({fish: f}: any) {
  return (
    <a key={f.name} href={f.wikiUrl} css={{textDecoration: 'none', display: 'inline-block', padding: 5, margin: 5, color: colors.blueLight, backgroundColor: colors.blueDark, borderRadius: '1em'}}>
    <img src={f.wikiImageUrl} />
    <div>{f.name}</div>
    <div>{f.location}</div>
    <div>{f.time}</div>
    <div>{sizeMap[f.shadowSize] || '???'} Shadow</div>
    <div>{f.price} Bells</div>
  </a>
  )
}

const sizeMap = {
  1: 'Tiny',
  2: 'Small',
  3: 'Medium',
  4: 'Large',
  5: 'Huge',
  6: 'Massive'
}
