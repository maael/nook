import {
  prepareCreate,
  prepareDelete,
  prepareGet,
  prepareGetByUserAndName
} from "./base";

export const createCollectionItem = prepareCreate(
  "BugCollectionInput",
  "createBugCollection"
);

export const deleteCollectionItem = prepareDelete("deleteBugCollection");

export const getCollectionItems = prepareGet("getBugCollectionByUser");

export const getCollectionItemByUserAndName = prepareGetByUserAndName(
  "getBugCollectionByUserAndName"
);
