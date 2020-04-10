import pipeFile from "../util/pipeFile";
import { getImageName } from "../../util/getImageUrl";

const bugData = require("../../data/bugs.json");
const fishData = require("../../data/fish.json");
const recipeData = require("../../data/recipes.json");
const fossilsData = require("../../data/fossils.json");

async function getDataImages(data: any[], type: string) {
  await Promise.all(
    data
      .filter(({ wikiImageUrl }) => wikiImageUrl)
      .map(async ({ wikiImageUrl, name }) => {
        try {
          await pipeFile(wikiImageUrl, ["images", type, getImageName(name)]);
        } catch (e) {
          console.error(e.message);
        }
      })
  );
}

export default async function getImages() {
  await Promise.all([
    getDataImages(bugData, "bug"),
    getDataImages(fishData, "fish"),
    getDataImages(fossilsData, "fossil"),
    getDataImages(recipeData, "recipe")
  ]);
}
