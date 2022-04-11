import { useState } from "react";

export const useStateInLocalStorage = (
  localStorageKey: string,
  initialValue: string
): [string, (newValue: string) => void] => {
  const initialWebhookStoreUrl =
    localStorage.getItem(localStorageKey) || initialValue;
  const [value, setValue] = useState(initialWebhookStoreUrl);
  const setWebhookStoreURLInLocalStorage = (newValue: string) => {
    localStorage.setItem(localStorageKey, newValue);
    setValue(newValue);
  };
  return [value, setWebhookStoreURLInLocalStorage];
};
