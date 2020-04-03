import {useState, SetStateAction, Dispatch} from 'react';
import LocalStorageKeys from '../../util/localstorage';

export {LocalStorageKeys};

const VERSION = 1;

function getKey (key: string) {
  return `${key}:${VERSION}`;
}

function getInitialValue (key: LocalStorageKeys, initialValue: any) {
  try {
    const item = window.localStorage.getItem(getKey(key));
    if (item === 'undefined') return undefined;
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    if (error.message !== 'window is not defined') console.error(error);
    return initialValue;
  }
}

export default function useLocalStorage<T>(key: LocalStorageKeys, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getInitialValue(key, initialValue);
  });

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(getKey(key), JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}