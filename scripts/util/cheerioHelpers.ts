import {cleanStrings} from './cleaners';
import {Hemisphere, TableCell} from './types';

/**
 * Allows typing Cheerio's toArray, and filters out any falsy entries
 */
export function typedToArray<T>(c: Cheerio) {
  return (c.toArray().filter(Boolean) as unknown) as Array<T>;
}

export function getHemisphereTable ($: CheerioStatic, hemisphere: Hemisphere, isNested: boolean = false) {
  return getTableRows($, `.tabbertab[title="${hemisphere}"]${isNested ? ' table table' : ''}`);
}

export function getTableRows ($: CheerioStatic, selector: string, shouldSkipFirst: boolean = true) {
  return $(selector).find('tr').toArray().map((el, i) => {
    if (shouldSkipFirst && i === 0) return undefined;
    return typedToArray<TableCell>($(el).find('td').map((_j, td) => {
      const text = cleanStrings($(td).text());
      const cell: TableCell = {
        text,
        number: parseInt(text, 10),
        src: $(td).find('img').attr('data-src'),
        href: $(td).find('a').attr('href')
      }
      return cell;
    }));
  }).filter((cells) => cells && cells.length !== 0) as TableCell[][];
}
