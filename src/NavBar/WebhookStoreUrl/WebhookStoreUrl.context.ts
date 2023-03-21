import React from "react";

export const WebhookStoreUrlContext = React.createContext({
  value: "https://webhook-store.herokuapp.com",
  setValue: (_newValue: string) => {
    return;
  },
});
