import got from "got";
import cheerio from "cheerio";
import { typedToArray, getTableRowsForEl } from "../util/cheerioHelpers";
import fetchHTML from "../util/fetchHTML";

export default async function getSculptures() {
  const { body } = await got(
    "https://animalcrossing.fandom.com/wiki/Category:Sculptures"
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
  const results = await fetchHTML(
    "sculptures",
    possibleLinks,
    "wikiUrl",
    false
  );
  return results
    .map(({ item, html }) => {
      const $ = cheerio.load(html);
      let $heading = $("#New_Horizons.mw-headline");
      if (!$heading.length) {
        $heading = $("#Forgery.mw-headline");
        if ($heading.length === 0) return;
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
        clues: [rows[0][0].text],
        canHaveForgery: true,
        wikiImageUrls: {
          forgery: rows[2][0].href,
          real:
            rows[2][1].href && !rows[2][1].href.includes("/Nia.png")
              ? rows[2][1].href
              : realImageFallback
        }
      };
    })
    .filter(Boolean);
}
