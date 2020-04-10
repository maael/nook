import got from "got";
import cheerio from "cheerio";
import { getTableRows } from "../util/cheerioHelpers";
import { TableCell } from "../util/types";

export default async function getRecipes() {
  return (await Promise.all(
    [
      "tool",
      "houseware",
      "misc",
      "wallMounted",
      "wallpaperFlooringRug",
      "equipment",
      "other"
    ].map(getRecipePage)
  )).reduce((acc, arr) => [...acc, ...arr], []);
}

const chunk = (arr: any[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const capitalise = (inp: string) =>
  `${inp.slice(0, 1).toUpperCase()}${inp.slice(1)}`;

function mapRecipeRowToData(rows: TableCell[][], type: string) {
  return rows.map(cells => {
    const $material = cheerio.load(cells[2].text) as any;
    return {
      name: cells[0].text.replace("(?)", "").trim(),
      wikiUrl: cells[0].href,
      wikiImageUrl: cells[1].src,
      materials: chunk(
        $material
          .text()
          .split(/(\d+)x/)
          .slice(1),
        2
      ).map(([quantity, material]) => ({
        quantity: parseInt(quantity, 10),
        material: capitalise(material.trim())
      })),
      size: getSize(cells[3].alt),
      obtainedFrom: cells[4].multiLineText,
      sellPrice: cells[5] ? cells[5].number || 0 : 0,
      type
    };
  });
}

function getSize(inp?: string) {
  if (!inp) {
    return {
      width: 0,
      height: 0
    };
  }
  const parts = inp.slice(2, -2).split("x");
  return {
    width: parseInt(parts[0], 10),
    height: parseInt(parts[1], 10)
  };
}

const pageMap = {
  tool: "https://animalcrossing.fandom.com/wiki/DIY_recipes/Tools",
  houseware: "https://animalcrossing.fandom.com/wiki/DIY_recipes/Housewares",
  misc: "https://animalcrossing.fandom.com/wiki/DIY_recipes/Miscellaneous",
  wallMounted:
    "https://animalcrossing.fandom.com/wiki/DIY_recipes/Wall-mounted",
  wallpaperFlooringRug:
    "https://animalcrossing.fandom.com/wiki/DIY_recipes/Wallpaper,_rugs_and_flooring",
  equipment: "https://animalcrossing.fandom.com/wiki/DIY_recipes/Equipment",
  other: "https://animalcrossing.fandom.com/wiki/DIY_recipes/Other"
};

async function getRecipePage(type: keyof typeof pageMap) {
  const url = pageMap[type];
  const { body } = await got(url);
  const $ = cheerio.load(body);
  return mapRecipeRowToData(getTableRows($, "#mw-content-text table"), type);
}
