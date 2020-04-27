import got from "got";
import cheerio from "cheerio";
import { typedToArray, getTableRowsForEl } from "../util/cheerioHelpers";
import fetchHTML from "../util/fetchHTML";

const forgedPaintingNames = [
  "Jolly Painting",
  "Famous Painting",
  "Wistful Painting",
  "Scary Painting",
  "Wild Painting",
  "Amazing Painting",
  "Academic Painting",
  "Moving Painting",
  "Solemn Painting",
  "Detailed Painting",
  "Graceful Painting",
  "Quaint Painting",
  "Basic Painting",
  "Scenic Painting",
  "Serene Painting"
].map(i => i.toLowerCase());

const realPaintings = [
  { name: "Apples and Oranges", artist: "Paul Cezanne" },
  { name: "A Bar at the Folies-Bergere", artist: "Edouard Manet" },
  { name: "Liberty Leading the People", artist: "Eugene Delacroix" },
  { name: "The Gleaners", artist: "Jean-Francois Millet" },
  {
    name: "A Sunday Afternoon on the Island of La Grande Jatte",
    artist: "Georges Seurat"
  },
  { name: "The Starry Night", artist: "Vincent van Gogh" },
  { name: "The Great Wave", artist: "Hokusai" },
  { name: "Isle of the Dead", artist: "Arnold Bocklin" },
  { name: "The Clothed Maja", artist: "Francisco de Goya" },
  { name: "Sunflowers", artist: "Vicent van Gogh" },
  { name: "The Fifer", artist: "Edouard Manet" },
  { name: "The Sower", artist: "Jean-Francois Millet" },
  { name: "Ophelia", artist: "The Fighting Temeraire" }
].map(({ name, artist }) => ({
  name,
  realName: name,
  artist,
  canHaveForgery: false,
  clues: []
}));

export default async function getPaintings() {
  const { body } = await got(
    "https://animalcrossing.fandom.com/wiki/Category:Paintings"
  );
  const $CATEGORY = cheerio.load(body);
  const possibleLinks = typedToArray<{ name: string; wikiUrl: string }>(
    $CATEGORY(".mw-content-text .category-page__member-link").map((_i, el) => ({
      name: $CATEGORY(el)
        .text()
        .trim(),
      wikiUrl: `https://animalcrossing.fandom.com${$CATEGORY(el).attr("href")}`
    }))
  );
  const results = await fetchHTML("paintings", possibleLinks, "wikiUrl", false);
  return results
    .map(({ item, html }) => {
      const $ = cheerio.load(html);
      let $heading = $("#New_Horizons.mw-headline");
      if (!$heading.length) {
        $heading = $("#Forgery.mw-headline");
        if (!$heading.length) {
          $heading = $('[id="Forgery_.28New_Horizons.29"].mw-headline');
          if ($heading.length === 0) {
            if (
              forgedPaintingNames.includes(item.name.toLowerCase()) ||
              $("#mw-content-text p")
                .text()
                .includes("Animal Crossing: New Horizons")
            ) {
              const artist = $('[data-source="artist"] div')
                .text()
                .trim();
              const realName = $('[data-source="real name"] div')
                .text()
                .trim();
              const realImageFallback = $(
                '[data-source="real-world image"] img'
              ).attr("src");
              return {
                ...item,
                artist,
                realName,
                canHaveForgery: forgedPaintingNames.includes(
                  item.name.toLowerCase()
                ),
                clues: ["???"],
                wikiImageUrls: {
                  real: realImageFallback
                }
              };
            } else {
              return;
            }
          }
        }
      }
      const $table = $heading.parent().next();
      if (!$table[0] || $table[0].name !== "table") return;
      const rows = getTableRowsForEl($, $table, false);
      const artist = $('[data-source="artist"] a')
        .text()
        .trim();
      const realName = $('[data-source="real name"] a')
        .text()
        .trim();
      const realImageFallback = $('[data-source="real-world image"] img').attr(
        "src"
      );
      return {
        ...item,
        artist,
        realName,
        canHaveForgery: forgedPaintingNames.includes(item.name.toLowerCase()),
        clues: [rows[0][0].text],
        wikiImageUrls: {
          forgery: rows[2][0].href,
          real:
            rows[2][1].href && !rows[2][1].href.includes("/Nia.png")
              ? rows[2][1].href
              : realImageFallback
        }
      };
    })
    .filter(Boolean)
    .concat(realPaintings as any)
    .filter(
      (p, idx, arr) => arr.findIndex(i => i!.realName === p!.realName) === idx
    );
}
