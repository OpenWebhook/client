import { useState } from "react";

export const useStateInLocalStorage = (
  localStorageKey: string,
  initialValue: string,
  validator: (newValue: string) => boolean
): [string, (newValue: string) => void] => {
  const initialWebhookStoreUrl =
    localStorage.getItem(localStorageKey) || initialValue;
  const [value, setValue] = useState(initialWebhookStoreUrl);
  const setWebhookStoreURLInLocalStorage = (newValue: string) => {
    if (validator(newValue)) {
      localStorage.setItem(localStorageKey, newValue);
      setValue(newValue);
    } else {
      console.warn("invalid new value, not stored");
    }
  };
  return [value, setWebhookStoreURLInLocalStorage];
};
