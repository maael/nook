import {useState} from 'react';
import LocalStorageKeys from '../../util/localstorage';

export {LocalStorageKeys};

function getInitialValue (key: LocalStorageKeys, initialValue: any) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    if (error.message !== 'window is not defined') console.error(error);
    return initialValue;
  }
}

export default function useLocalStorage(key: LocalStorageKeys, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    return getInitialValue(key, initialValue);
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}