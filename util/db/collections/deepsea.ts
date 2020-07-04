import {
  prepareCreate,
  prepareDelete,
  prepareGet,
  prepareGetByUserAndName
} from "./base";

export const createCollectionItem = prepareCreate(
  "DeepSeaCollectionInput",
  "createDeepSeaCollection"
);

export const deleteCollectionItem = prepareDelete("deleteDeepSeaCollection");

export const getCollectionItems = prepareGet("getDeepSeaCollectionByUser");

export const getCollectionItemByUserAndName = prepareGetByUserAndName(
  "getDeepSeaCollectionByUserAndName"
);
