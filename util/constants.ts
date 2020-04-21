import { SortOption } from "../types";

export const JWT_VERSION = 1;
export const COOKIE_NAME = "nook-jwt";
export const SYNC_PARAM_NAME = "sync";

export const CUSTOM_DESIGN_TYPES = [
  "Tank top",
  "Short-sleeve tee",
  "Long-sleeve dress shirt",
  "Sweater",
  "Hoodie",
  "Coat",
  "Sleeveless dress",
  "Short-sleeve dress",
  "Long-sleeve dress",
  "Round dress",
  "Balloon-hem dress",
  "Robe",
  "Brimmed cap",
  "Knit cap",
  "Brimmed Hat",
  "Custom design",
  "Phone Case"
];

export const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Critterpedia Order", value: SortOption.Critterpedia },
  { label: "Price Descending", value: SortOption.PriceDescending }
];
