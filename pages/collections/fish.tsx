/** @jsx jsx */
import { jsx } from "@emotion/core";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";
import MonthBar, {MONTHS} from "../../components/primitives/MonthBar";
import FishItem from "../../components/primitives/FishItem";
import useLocalstorage, {
  LocalStorageKeys
} from "../../components/hooks/useLocalstorage";
import { colors } from "../../util/theme";
import { CURRENT_MONTH, isAvailable, isAlwaysAvailable } from "../../util/collections";

const fishData = require("../../data/fish.json");

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
      <div css={styles.container}>
        <MonthBar active={month} onChange={setMonth} />
        <div css={styles.header}>Exclusively available in {MONTHS[month]}</div>
        {fishData
          .filter(({ northernMonths }) => !isAlwaysAvailable(northernMonths) && isAvailable(northernMonths, month))
          .map(f => (
            <FishItem key={f.name} fish={f} />
          ))}
        <div css={styles.header}>Always available</div>
        {fishData
          .filter(({ northernMonths }) => isAlwaysAvailable(northernMonths))
          .map(f => (
            <FishItem key={f.name} fish={f} />
          ))}
        <div css={styles.header}>Others</div>
        {fishData
          .filter(({ northernMonths }) => !isAlwaysAvailable(northernMonths) && !isAvailable(northernMonths, month))
          .map(f => (
            <FishItem key={f.name} fish={f} />
          ))}
      </div>
    </>
  );
}
