import Fuse, { IFuseOptions } from "fuse.js";

export const SETTINGS: IFuseOptions<any> = {
  caseSensitive: false,
  findAllMatches: false,
  includeMatches: false,
  includeScore: false,
  useExtendedSearch: false,
  minMatchCharLength: 1,
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  keys: ["name"]
};

export default function createFuse<D extends readonly any[]>(data: D) {
  return new Fuse<D, {}>(data, SETTINGS);
}
