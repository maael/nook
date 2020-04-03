/** @jsx jsx */
import { jsx } from "@emotion/core";
import CollectionHeaderBar from '../../components/compositions/CollectionHeaderBar';
import BugItem from '../../components/primitives/BugItem';
import MonthBar, {MONTHS} from "../../components/primitives/MonthBar";
import useLocalstorage, {
  LocalStorageKeys
} from "../../components/hooks/useLocalstorage";
import { CURRENT_MONTH, isAvailable, isAlwaysAvailable } from "../../util/collections";
import {colors} from '../../util/theme';

const bugsData = require('../../data/bugs.json');

const styles = {
  container: {
    margin: "0px auto",
    textAlign: "center",
    padding: 10,
    maxWidth: 1000
  },
  header: {
    marginTop: 10,
    marginBottom: 5,
    color: colors.blueDark
  }
} as const;

export default function Collections() {
  const [month, setMonth] = useLocalstorage(
    LocalStorageKeys.SELECTED_MONTH,
    CURRENT_MONTH
  );
  return (
    <>
    <CollectionHeaderBar />
    <div
      css={styles.container}
    >
        <MonthBar active={month} onChange={setMonth} />
        <div css={styles.header}>Exclusively available in {MONTHS[month]}</div>
        {bugsData
          .filter(({ northernMonths }) => !isAlwaysAvailable(northernMonths) && isAvailable(northernMonths, month))
          .map(b => (
            <BugItem key={b.name} bug={b} />
          ))}
        <div css={styles.header}>Always available</div>
        {bugsData
          .filter(({ northernMonths }) => isAlwaysAvailable(northernMonths))
          .map(b => (
            <BugItem key={b.name} bug={b} />
          ))}
        <div css={styles.header}>Others</div>
        {bugsData
          .filter(({ northernMonths }) => !isAlwaysAvailable(northernMonths) && !isAvailable(northernMonths, month))
          .map(b => (
            <BugItem key={b.name} bug={b} />
          ))}
      </div>
    </>
  );
}
