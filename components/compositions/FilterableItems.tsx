/** @jsx jsx */
import { jsx } from "@emotion/core";
import { MONTHS } from "../primitives/MonthSelect";
import Heading from "../primitives/Heading";
import { isAvailable, isAlwaysAvailable } from "../../util/collections";
import { colors } from "../../util/theme";
import { ReactNode } from "react";

interface Props<T> {
  month?: number;
  hemisphere: string;
  filtered: T[];
  generateItem: (data: T) => ReactNode;
}

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
      <Heading>Available in {MONTHS[month]}</Heading>
      {filtered
        .filter(
          d =>
            !isAlwaysAvailable(getMonths(d, hemisphere)) &&
            isAvailable(getMonths(d, hemisphere), month)
        )
        .map(generateItem)}
      <Heading>Always available</Heading>
      {filtered
        .filter(d => isAlwaysAvailable(getMonths(d, hemisphere)))
        .map(generateItem)}
    </>
  ) : (
    <>{filtered.map(generateItem)}</>
  );
}
