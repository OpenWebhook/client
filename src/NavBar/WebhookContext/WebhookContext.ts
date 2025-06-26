import React from "react";

export const WebhookContext = React.createContext({
  webhookStoreUrl: "https://webhook-store.herokuapp.com",
  setWebhooksStoreUrl: (_newValue: string) => {},
  debugUrl: "http://localhost:8010/proxy",
  setDebugUrl: (_newValue: string) => {},
});
