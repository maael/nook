import cheerio from "cheerio";
import fetchHTML from "../util/fetchHTML";

enum Rarity {
  Common = "Common",
  Uncommon = "Uncommon",
  "Fairly Common" = "Fairly Common",
  Scarce = "Scarce",
  Unknown = "Unknown",
  Rare = "Rare",
  "Very Rare" = "Very Rare"
}

export default async function embellishBugs() {
  const bugs = require("../../data/bugs.json");
  const results = await fetchHTML("bugs", bugs, "wikiUrl", false);
  return results.map(({ item, html }) => {
    const $ = cheerio.load(html);
    const rarity = $('[data-source="rarity"] div')
      .text()
      .trim();
    const index = parseInt(
      $('[data-source="index NH"]')
        .last()
        .text()
        .replace("#", "")
        .trim(),
      10
    );
    const actualRarity = Object.values(Rarity)
      .map(v => ({
        i:
          v === "Common"
            ? rarity.indexOf(Rarity.Uncommon) === -1 &&
              rarity.indexOf(Rarity["Fairly Common"]) === -1
              ? rarity.indexOf(v)
              : -1
            : v === "Rare"
            ? rarity.indexOf(Rarity["Very Rare"]) === -1
              ? rarity.indexOf(v)
              : -1
            : rarity.indexOf(v),
        v
      }))
      .filter(({ i }) => i > -1)
      .sort((a, b) => a.i - b.i)
      .pop();
    return {
      ...item,
      rarity: actualRarity ? actualRarity.v : Rarity.Unknown,
      index: isNaN(index) ? -1 : index
    };
  });
}
