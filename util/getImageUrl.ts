export function getImageUrl(
  type: "fish" | "fossil" | "recipe" | "bug",
  name: string
) {
  return `/images/${type}/${getImageName(name)}`;
}

export function getImageName(name: string) {
  return `${name.replace(/[\.\s]/g, "-")}.png`;
}
