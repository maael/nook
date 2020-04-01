import { useEffect, useState } from "react";
import differenceInHours from "date-fns/differenceInHours";

export type FetchSource = "local" | "custom";

export interface Options<T> {
  source: FetchSource;
  defaultValue?: T;
  mapper?: (v: any) => T;
  suffix?: (() => string) | string;
}

const sourcePrefixMap: Record<FetchSource, string> = {
  local: "/api",
  custom: ""
};

function getLocal(path: string) {
  try {
    const local = JSON.parse(localStorage.getItem(path) || "{}");
    if (
      local &&
      local.timestamp &&
      differenceInHours(new Date(), new Date(local.timestamp)) < 4
    ) {
      return local.data;
    }
    return undefined;
  } catch (e) {
    console.error("[error]", e);
    return undefined;
  }
}

function setLocal(path: string, body: any) {
  try {
    localStorage.setItem(
      path,
      JSON.stringify({
        timestamp: new Date().toISOString(),
        data: body
      })
    );
  } catch (e) {
    console.error("[error]", e);
  }
}

export default function useFetch<T>(
  path: string,
  options: RequestInit = {},
  customOptions: Options<T> = { source: "local" },
  dependencies: any[] = []
): [T, boolean, string | undefined, () => Promise<void>] {
  const [data, setData] = useState(customOptions.defaultValue as T);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  async function refetch() {
    setLoading(true);
    setError(undefined);
    try {
      const res = await fetch(
        `${sourcePrefixMap[customOptions.source]}${path}${
          typeof customOptions.suffix === "function"
            ? customOptions.suffix()
            : customOptions.suffix || ""
        }`,
        {
          credentials:
            customOptions.source === "local" ? "include" : options.credentials,
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...options.headers
          }
        }
      );
      if (res.ok) {
        const json = await res.json();
        setData(customOptions.mapper ? customOptions.mapper(json) : json);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    refetch().catch(e => console.error(e));
  }, dependencies);
  return [data, loading, error, refetch];
}
