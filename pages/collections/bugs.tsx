/** @jsx jsx */
import { jsx } from "@emotion/core";
import CollectionHeaderBar from '../../components/compositions/CollectionHeaderBar';
import {colors} from '../../util/theme';

const bugsData = require('../../data/bugs.json');

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
      {bugsData.filter(({northernMonths}) => isAvailable(northernMonths)).map((b) => (
        <BugItem key={b.name} bug={b} />
      ))}
      <div css={{marginTop: 10, marginBottom: 5, color: colors.blueDark}}>All</div>
      {bugsData.map((b) => (
        <BugItem key={b.name} bug={b} />
      ))}
    </div>
    </>
  );
}

function BugItem ({bug: b}: any) {
  return (
    <a key={b.name} href={b.wikiUrl} css={{textDecoration: 'none', display: 'inline-block', padding: 5, margin: 5, color: colors.blueLight, backgroundColor: colors.blueDark, borderRadius: '1em'}}>
    <img src={b.wikiImageUrl} />
    <div>{b.name}</div>
    <div>{b.location}</div>
    <div>{b.time}</div>
    <div>{b.price} Bells</div>
  </a>
  )
}