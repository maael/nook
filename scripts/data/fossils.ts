import got from 'got';
import cheerio from 'cheerio';
import {getTableRows} from '../util/cheerioHelpers';
import { TableCell } from '../util/types';

export default async function getFossils () {
  const {body} = await got('https://animalcrossing.fandom.com/wiki/Fossils_(New_Horizons)');
  const $ = cheerio.load(body);

  return [];
}