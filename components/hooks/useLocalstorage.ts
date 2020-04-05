import { useState, SetStateAction, Dispatch, useEffect } from "react";
import useJWT from "./useJWT";
import LocalStorageKeys from "../../util/localstorage";

export { LocalStorageKeys };

const VERSION = 1;

export function getKey(key: string, userId: string | undefined) {
  return `${key}:${userId || "[local]"}:${VERSION}`;
}

function getInitialValue(
  key: LocalStorageKeys,
  userId: string | undefined,
  initialValue: any
) {
  try {
    const item = window.localStorage.getItem(getKey(key, userId));
    if (item === "undefined") return undefined;
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    if (error.message !== "window is not defined") console.error(error);
    return initialValue;
  }
}

export default function useLocalStorage<T>(
  key: LocalStorageKeys,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const jwt = useJWT();
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getInitialValue(key, jwt ? jwt._id : undefined, initialValue);
  });

  useEffect(() => {
    setValue(getInitialValue(key, jwt ? jwt._id : undefined, initialValue));
  }, [jwt && jwt._id]);

  const setValue: Dispatch<SetStateAction<T>> = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(
        getKey(key, jwt ? jwt._id : undefined),
        JSON.stringify(valueToStore)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
