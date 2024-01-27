export function getImageUrl(
  type:
    | "fish"
    | "fossil"
    | "recipe"
    | "bug"
    | "painting"
    | "sculpture"
    | "deepsea",
  name: string,
  subPath?: string
) {
  return `/images/${type}${subPath ? `/${subPath}` : ""}/${getImageName(name)}`;
}

export function getImageName(name: string) {
  return `${(name || "").replace(/[\.\s]/g, "-")}.png`;
}
