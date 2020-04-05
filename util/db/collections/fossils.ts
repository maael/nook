import {
  prepareCreate,
  prepareDelete,
  prepareGet,
  prepareGetByUserAndName
} from "./base";

export const createCollectionItem = prepareCreate(
  "FossilCollectionInput",
  "createFossilCollection"
);

export const deleteCollectionItem = prepareDelete("deleteFossilCollection");

export const getCollectionItems = prepareGet("getFossilCollectionByUser");

export const getCollectionItemByUserAndName = prepareGetByUserAndName(
  "getFossilCollectionByUserAndName"
);
