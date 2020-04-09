import { useState, useEffect, Dispatch, SetStateAction } from "react";
import useJWT from "./useJWT";

export default function useSavedCustomDesigns(): [
  any[],
  Dispatch<SetStateAction<any>>
] {
  const [savedCustomDesigns, setSavedCustomDesigns] = useState<any[]>([]);
  const jwt = useJWT();
  useEffect(() => {
    (async () => {
      if (!jwt || !jwt._id) return;
      const res = await fetch("/api/db/saved/custom-designs");
      if (res.ok) {
        setSavedCustomDesigns(await res.json());
      }
    })();
  }, [jwt]);
  return [savedCustomDesigns, setSavedCustomDesigns];
}
