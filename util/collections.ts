export const CURRENT_MONTH = new Date().getMonth();

export function isAvailable(months: Record<string, boolean>, month: number) {
  return Object.values(months)[month];
}

export function isAlwaysAvailable(months: Record<string, boolean>) {
  return Object.values(months).every(Boolean);
}