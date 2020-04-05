import {
  prepareCreate,
  prepareDelete,
  prepareGet,
  prepareGetByUserAndName
} from "./base";

export const createCollectionItem = prepareCreate(
  "FishCollectionInput",
  "createFishCollection"
);

export const deleteCollectionItem = prepareDelete("deleteFishCollection");

export const getCollectionItems = prepareGet("getFishCollectionByUser");

export const getCollectionItemByUserAndName = prepareGetByUserAndName(
  "getFishCollectionByUserAndName"
);
