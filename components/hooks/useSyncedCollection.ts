import { SetStateAction, Dispatch, useEffect } from "react";
import useJWT from "./useJWT";
import { LocalStorageKeys } from "./useLocalstorage";
import { JWT } from "../../types";

const collectionMap = {
  [LocalStorageKeys.BUGS_COLLECTION]: "bugs",
  [LocalStorageKeys.FISH_COLLECTION]: "fish",
  [LocalStorageKeys.DIY_COLLECTION]: "diy",
  [LocalStorageKeys.FOSSIL_COLLECTION]: "fossils"
};

function getCollectionFromKey(key: LocalStorageKeys): string | undefined {
  return collectionMap[key];
}

async function request(
  method: "POST" | "DELETE",
  userId: string | undefined,
  key: LocalStorageKeys,
  name: string
) {
  try {
    if (!userId) return;
    const collection = getCollectionFromKey(key);
    if (!collection) throw new Error(`Missing collection for: ${key}`);
    await fetch(`/api/db/collections/${collection}`, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name
      })
    });
  } catch (e) {
    console.error(e);
  }
}

function initOnAdd(userId: string | undefined, key: LocalStorageKeys) {
  return async function(name: string) {
    await request("POST", userId, key, name);
  };
}

function initOnRemove(userId: string | undefined, key: LocalStorageKeys) {
  return async function(name: string) {
    await request("DELETE", userId, key, name);
  };
}

function handle(userId: string | undefined, key: LocalStorageKeys) {
  const add = initOnAdd(userId, key);
  const remove = initOnRemove(userId, key);
  return async function(collection: any[], name: string) {
    if (collection.includes(name)) {
      await remove(name);
    } else {
      await add(name);
    }
  };
}

async function handleInit<T>(
  jwt: JWT | null | undefined,
  key: LocalStorageKeys,
  setCollection: Dispatch<SetStateAction<T>>
) {
  const collection = getCollectionFromKey(key);
  if (jwt && jwt._id && collection) {
    try {
      const res = await fetch(`/api/db/collections/${collection}`);
      if (res.ok) {
        const data = (await res.json()).map(({ name }) => name);
        setCollection(data);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default function useSyncedCollection<T>(
  key: LocalStorageKeys,
  setCollection: Dispatch<SetStateAction<T>>
) {
  const jwt = useJWT();
  const id = jwt ? jwt._id : undefined;
  useEffect(() => {
    handleInit<T>(jwt, key, setCollection);
  }, [jwt && jwt._id]);
  return handle(id, key);
}
