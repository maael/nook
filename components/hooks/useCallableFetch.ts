import { useState } from "react";

export type FetchSource = "local" | "custom";

export interface Options<T> {
  source: FetchSource;
  defaultValue?: T;
  mapper?: (v: any) => T;
  generateSuffixFromBody?: (v: RequestInit["body"]) => string;
  suffix?: string;
}

const sourcePrefixMap: Record<FetchSource, string> = {
  local: "/api",
  custom: ""
};

export default function useCallableFetch<T>(
  path: string,
  options: RequestInit = {},
  customOptions: Options<T> = { source: "local" }
): [
  (requestInit?: RequestInit, suffix?: string) => Promise<T>,
  T,
  boolean,
  string | undefined
] {
  const [data, setData] = useState(customOptions.defaultValue as T);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  async function callFetch(requestInit: RequestInit = {}, suffix: string = "") {
    let json;
    try {
      setError(undefined);
      setLoading(true);
      const res = await fetch(
        `${sourcePrefixMap[customOptions.source]}${path}${
          customOptions.generateSuffixFromBody
            ? customOptions.generateSuffixFromBody(requestInit.body)
            : suffix
            ? `/${suffix}`
            : customOptions.suffix
            ? customOptions.suffix
            : ""
        }`,
        {
          credentials:
            customOptions.source === "local" ? "include" : options.credentials,
          ...options,
          ...requestInit,
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
            ...requestInit.headers
          }
        }
      );
      if (res.ok) {
        const rawJson = await res.json();
        json = customOptions.mapper ? customOptions.mapper(rawJson) : rawJson;
        setData(json);
      } else {
        const e = await json.text();
        setError(e);
      }
    } catch (e) {
      setError(e.message);
      return undefined;
    } finally {
      setLoading(false);
    }
    return json;
  }
  return [callFetch, data, loading, error];
}
