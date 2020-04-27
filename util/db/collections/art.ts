import {
  prepareCreate,
  prepareDelete,
  prepareGet,
  prepareGetByUserAndName
} from "./base";

export const createCollectionItem = prepareCreate(
  "ArtCollectionInput",
  "createArtCollection"
);

export const deleteCollectionItem = prepareDelete("deleteArtCollection");

export const getCollectionItems = prepareGet("getArtCollectionByUser");

export const getCollectionItemByUserAndName = prepareGetByUserAndName(
  "getArtCollectionByUserAndName"
);
