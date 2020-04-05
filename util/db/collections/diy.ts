import {
  prepareCreate,
  prepareDelete,
  prepareGet,
  prepareGetByUserAndName
} from "./base";

export const createCollectionItem = prepareCreate(
  "RecipeCollectionInput",
  "createRecipeCollection"
);

export const deleteCollectionItem = prepareDelete("deleteRecipeCollection");

export const getCollectionItems = prepareGet("getRecipeCollectionByUser");

export const getCollectionItemByUserAndName = prepareGetByUserAndName(
  "getRecipeCollectionByUserAndName"
);
