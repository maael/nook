import got from 'got';
import cheerio from 'cheerio';
import {typedToArray} from '../util/cheerioHelpers';
import {cleanStrings} from '../util/cleaners';
import { getImageUrl } from "../../util/getImageUrl";

const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];
function parseStr (str: string) {
  let state = false;
  let idx = 0;
  const out = {};
  str.split('').forEach((s) => {
    if (s === ' ') return;
    if (s === '|') {
      state = !state;
      return;
    }
    out[months[idx]] = state;
    idx++;
  });
  return out;
}

export default async function getDeepSea () {
  const {body} = await got('https://nookipedia.com/wiki/Sea_creatures/New_Horizons');
  const $ = cheerio.load(body);
  const rows = typedToArray($('.table-fish table tr').map((i, el) => {
    if (i === 0 || $(el).find('td').length !== 10) return;
    const data = typedToArray<{text: string, href: string, src: string, $el: Cheerio}>($(el).find('td').map((j, td) => {
      return {
        text: cleanStrings($(td).text()),
        href: $(td).find('a').attr('href'),
        src: $(td).find('img').attr('src'),
        $el: $(td)
      }
    }));
    return {
      id: parseInt(data[0].text) || -1,
      name: data[1].text,
      wikiUrl: `https://nookipedia.com${data[1].href}`,
      wikiImageUrl: data[2].src,
      icon: getImageUrl('deepsea', data[1].text),
      price: parseInt(data[3].text.replace(/,/, '')),
      shadowSize: data[4].text,
      shadowMovement: data[5].text,
      rarity: data[6].text === '-' ? 'Unknown' : data[6].text,
      totalCatches: parseInt(data[7].text) || 0,
      time: data[8].text,
      northernMonths: parseStr((data[9].$el.find('span').first().html() || '').replace(/<\/?span.*?>/g, '|')),
      southernMonths: parseStr((data[9].$el.find('p>span').first().html() || '').replace(/<\/?span.*?>/g, '|'))
    }
  }));
  return rows;
}