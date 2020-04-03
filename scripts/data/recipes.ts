import got from "got";
import cheerio from "cheerio";
import { getTableRows } from "../util/cheerioHelpers";
import { TableCell } from "../util/types";

export default async function getRecipes() {
  const { body } = await got(
    "https://animalcrossing.fandom.com/wiki/DIY_recipes"
  );
  const $ = cheerio.load(body);
  const tools = mapRecipeRowToData(
    getTableRows($, ".article-table:nth-of-type(1)"),
    "tool"
  );
  const housewares = mapRecipeRowToData(
    getTableRows($, ".article-table:nth-of-type(2)"),
    "houseware"
  );
  const misc = mapRecipeRowToData(
    getTableRows($, ".article-table:nth-of-type(3)"),
    "misc"
  );
  const wallMounted = mapRecipeRowToData(
    getTableRows($, ".article-table:nth-of-type(4)"),
    "wallMounted"
  );
  const wallpaperFlooringRug = mapRecipeRowToData(
    getTableRows($, ".article-table:nth-of-type(5)"),
    "wallpaperFlooringRug"
  );
  const equipment = mapRecipeRowToData(
    getTableRows($, ".article-table:nth-of-type(6)"),
    "equipment"
  );
  const other = mapRecipeRowToData(
    getTableRows($, ".article-table:nth-of-type(7)"),
    "other"
  );
  return [
    ...tools,
    ...housewares,
    ...misc,
    ...wallMounted,
    ...wallpaperFlooringRug,
    ...equipment,
    ...other
  ];
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
      sellPrice: cells[5].number || 0,
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
