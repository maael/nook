/** @jsx jsx */
import { jsx } from "@emotion/core";
import { MONTHS } from "../primitives/MonthSelect";
import { isAvailable, isAlwaysAvailable } from "../../util/collections";
import { colors } from "../../util/theme";
import { ReactNode } from "react";

interface Props<T> {
  month?: number;
  hemisphere: string;
  filtered: T[];
  generateItem: (data: T) => ReactNode;
}

const styles = {
  header: {
    marginTop: 10,
    marginBottom: 5,
    color: colors.blueDark
  }
} as const;

function getMonths(d: any, hemisphere: string) {
  return hemisphere === "Northern Hemisphere"
    ? d.northernMonths
    : d.southernMonths;
}

export default function FilterableItems<T extends any>({
  month,
  filtered,
  hemisphere,
  generateItem
}: Props<T>) {
  return month ? (
    <>
      <div css={styles.header}>Available in {MONTHS[month]}</div>
      {filtered
        .filter(
          d =>
            !isAlwaysAvailable(getMonths(d, hemisphere)) &&
            isAvailable(getMonths(d, hemisphere), month)
        )
        .map(generateItem)}
      <div css={styles.header}>Always available</div>
      {filtered
        .filter(d => isAlwaysAvailable(getMonths(d, hemisphere)))
        .map(generateItem)}
    </>
  ) : (
    <>{filtered.map(generateItem)}</>
  );
}
