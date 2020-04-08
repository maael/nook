import { useState, useEffect, Dispatch, SetStateAction } from "react";

export default function useCustomDesigns(): [
  any[],
  Dispatch<SetStateAction<any>>
] {
  const [customDesigns, setCustomDesigns] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/db/custom-designs");
      if (res.ok) {
        setCustomDesigns(await res.json());
      }
    })();
  }, []);
  return [customDesigns, setCustomDesigns];
}
