import { useEffect } from "react";
import { LocalStorageKeys, getKey } from "./useLocalstorage";
import useJWT from "./useJWT";

function safeGetItem(userId: string, key: LocalStorageKeys) {
  try {
    return JSON.parse(localStorage.getItem(getKey(key, userId)) || "[]");
  } catch {
    return [];
  }
}

export default function useFirstSync() {
  const jwt = useJWT();
  useEffect(() => {
    (async () => {
      if (jwt && jwt._id && !jwt.hasHadFirstSync) {
        try {
          await fetch("/api/db/collections/sync", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId: jwt._id,
              fish: safeGetItem(jwt._id, LocalStorageKeys.FISH_COLLECTION),
              bugs: safeGetItem(jwt._id, LocalStorageKeys.BUGS_COLLECTION),
              fossils: safeGetItem(jwt._id, LocalStorageKeys.FOSSIL_COLLECTION),
              diy: safeGetItem(jwt._id, LocalStorageKeys.DIY_COLLECTION)
            })
          });
        } catch (e) {
          console.error(e);
        }
      }
    })();
  }, [jwt && jwt._id && jwt.hasHadFirstSync]);
}
