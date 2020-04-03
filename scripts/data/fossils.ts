import got from "got";
import cheerio from "cheerio";
import { getTableRows } from "../util/cheerioHelpers";
import { TableCell } from "../util/types";

export default async function getFossils() {
  const { body } = await got(
    "https://animalcrossing.fandom.com/wiki/Fossils_(New_Horizons)"
  );
  const $ = cheerio.load(body);
  const standalone = mapFossilRowToData(
    getTableRows($, ".roundy:nth-of-type(4) table"),
    "standalone"
  );
  const multipart = mapFossilRowToData(
    getTableRows($, ".roundy:nth-of-type(5) table"),
    "multipart"
  );
  return [...standalone, ...multipart];
}

function mapFossilRowToData(rows: TableCell[][], type: string) {
  return rows.map(cells => {
    return {
      name: cells[0].text,
      wikiUrl: cells[0].href,
      wikiImageUrl: cells[1].src,
      sellPrice: cells[2].number,
      type
    };
  });
}
