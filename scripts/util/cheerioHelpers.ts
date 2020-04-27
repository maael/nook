import { cleanStrings } from "./cleaners";
import { Hemisphere, TableCell } from "./types";

/**
 * Allows typing Cheerio's toArray, and filters out any falsy entries
 */
export function typedToArray<T>(c: Cheerio) {
  return (c.toArray().filter(Boolean) as unknown) as Array<T>;
}

export function getHemisphereTable(
  $: CheerioStatic,
  hemisphere: Hemisphere,
  isNested: boolean = false
) {
  return getTableRows(
    $,
    `.tabbertab[title="${hemisphere}"]${isNested ? " table table" : ""}`
  );
}

export function getTableRows(
  $: CheerioStatic,
  selector: string,
  shouldSkipFirst: boolean = true
) {
  return getTableRowsForEl($, $(selector), shouldSkipFirst);
}

export function getTableRowsForEl(
  $: CheerioStatic,
  $el: Cheerio,
  shouldSkipFirst: boolean = true
) {
  return $el
    .find("tr")
    .toArray()
    .map((el, i) => {
      if (shouldSkipFirst && i === 0) return undefined;
      return typedToArray<TableCell>(
        $(el)
          .find("td")
          .map((_j, td) => {
            const text = cleanStrings($(td).text());
            const href = $(td)
              .find("a")
              .attr("href");
            const cell: TableCell = {
              text,
              number: parseInt(text.replace(/,/g, ""), 10),
              src:
                $(td)
                  .find("img")
                  .attr("data-src") ||
                $(td)
                  .find("img")
                  .attr("src"),
              alt: $(td)
                .find("img")
                .attr("alt"),
              href:
                href && href.startsWith("/")
                  ? `https://animalcrossing.fandom.com${href}`
                  : href,
              multiLineText:
                $(td)
                  .children()
                  .toArray()
                  .map(c =>
                    $(c)
                      .text()
                      .trim()
                  )
                  .filter(Boolean) || []
            };
            return cell;
          })
      );
    })
    .filter(cells => cells && cells.length !== 0) as TableCell[][];
}
