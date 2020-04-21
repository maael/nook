export function calculateSouthernMonthsFromNorthern(
  months: Record<string, boolean>
) {
  const isAllYear = Object.values(months).every(Boolean);
  if (isAllYear) return months;
  return Object.entries(months).reduce((acc, [k], i, arr) => {
    return {
      ...acc,
      [k]: arr[(i + 6) % arr.length][1]
    };
  }, {});
}

export function monthStringToBool(inp: string) {
  return inp === "✓";
}
