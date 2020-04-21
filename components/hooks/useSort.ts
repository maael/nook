import { useMemo } from "react";
import { SortOption } from "../../types";

const sortFnMap: Record<SortOption, (a: any, b: any) => number> = {
  [SortOption.Critterpedia]: () => 0,
  [SortOption.PriceDescending]: (a, b) => b.price - a.price
};

export default function useSort(
  collection: any[],
  sortType: SortOption = SortOption.Critterpedia
) {
  return useMemo(() => collection.sort(sortFnMap[sortType]), [
    sortType,
    collection
  ]);
}
