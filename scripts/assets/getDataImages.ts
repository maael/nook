import pipeFile from "../util/pipeFile";
import { getImageName } from "../../util/getImageUrl";

const bugData = require("../../data/bugs.json");
const fishData = require("../../data/fish.json");
const recipeData = require("../../data/recipes.json");
const fossilsData = require("../../data/fossils.json");
const paintingsData = require("../../data/paintings.json");
const sculpturesData = require("../../data/sculptures.json");

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

async function getArtDataImages(data: any[], type: string) {
  await Promise.all(
    data
      .filter(({ wikiImageUrls }) => wikiImageUrls)
      .map(async ({ wikiImageUrls, name }) => {
        try {
          if (wikiImageUrls.forgery)
            await pipeFile(wikiImageUrls.forgery, [
              "images",
              type,
              "forgery",
              getImageName(name)
            ]);
          if (wikiImageUrls.real)
            await pipeFile(wikiImageUrls.real, [
              "images",
              type,
              "real",
              getImageName(name)
            ]);
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
    getDataImages(recipeData, "recipe"),
    getArtDataImages(paintingsData, "painting"),
    getArtDataImages(sculpturesData, "sculpture")
  ]);
}
