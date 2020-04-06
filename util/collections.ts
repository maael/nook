export const CURRENT_MONTH = new Date().getMonth();

export function isAvailable(months: Record<string, boolean>, month?: number) {
  return month === undefined ? true : Object.values(months)[month];
}

export function isAlwaysAvailable(months: Record<string, boolean>) {
  return Object.values(months).every(Boolean);
}

export function isNewThisMonth(months: Record<string, boolean>, month: number) {
  const previousMonth = month - 1 < 0 ? 11 : month - 1;
  const values = Object.values(months);
  return values[month] && !values[previousMonth];
}

export function isDisappearingThisMonth(
  months: Record<string, boolean>,
  month: number
) {
  const nextMonth = month + 1 > 11 ? 0 : month + 1;
  const values = Object.values(months);
  return values[month] && !values[nextMonth];
}

export function isCurrentlyAvailable(
  months: Record<string, boolean>,
  time: string
) {
  if (!Object.values(months)[CURRENT_MONTH]) return false;
  if (time === "All day") return true;
  const timeStringInfo = time.split(" - ").map(s => {
    const parts = s.split(" ");
    const hour = parseInt(parts[0]);
    return hour + (parts[1] === "PM" ? 12 : 0);
  });
  if (timeStringInfo.length !== 2) return false;
  const currentHour = new Date().getHours();
  return (
    currentHour > timeStringInfo[0] && new Date().getHours() < timeStringInfo[1]
  );
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
