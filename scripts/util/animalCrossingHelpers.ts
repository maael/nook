export function calculateSouthernMonthsFromNorthern (months: Record<string, boolean>) {
  const isAllYear = Object.values(months).every(Boolean);
  if (isAllYear) return months;
  return Object.entries(months).reduce((acc, [k, v]) => ({...acc, [k]: !v}), {});
}

export function monthStringToBool (inp: string) {
  return inp === '✓';
}