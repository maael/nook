export const CURRENT_MONTH = new Date().getMonth();

export function isAvailable(months: Record<string, boolean>, month?: number) {
  return month === undefined ? true : Object.values(months)[month];
}

export function isAlwaysAvailable(months: Record<string, boolean>) {
  return Object.values(months).every(Boolean);
}

export const fishSizeMap = {
  1: "Tiny",
  2: "Small",
  3: "Medium",
  4: "Large",
  5: "Huge",
  6: "Massive",
  "4 (Fin)": "Large (Fin)",
  "6 (Fin)": "Massive (Fin)",
  Narrow: "Narrow"
};

export const recipeTypeMap = {
  tool: "Tool",
  houseware: "Houseware",
  misc: "Misc",
  wallMounted: "Wall Mounted",
  wallpaperFlooringRug: "Wallpaper/Flooring/Rug",
  equipment: "Equipment",
  other: "Other"
};
