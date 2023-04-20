import "@pluralsight/ps-design-system-normalize";

import React, { Suspense } from "react";

const AppFrame = React.lazy(
  () => import("@pluralsight/ps-design-system-appframe")
);
const SkillsTopNav = React.lazy(() => import("./TopNav"));
import Theme from "@pluralsight/ps-design-system-theme";

const WebhookList = React.lazy(
  () => import("./WebhookDisplay/WebhookList.component")
);
import { ApolloProvider } from "@apollo/client";
import { WebhookContext } from "./NavBar/WebhookContext/WebhookContext";
import { createApolloClient } from "./apollo.client";
import { useStateInLocalStorage } from "./use-state-with-local-storage.hook";
import { isValidHttpUrl } from "./utils/is-valid-url";

// https://coolors.co/23f0c7-fb6107-f3de2c-5c8001-fbb02d

export default function App() {
  const defaultWebhookStoreUrl =
    window.location.hostname === "demo.openwebhook.io"
      ? "https://webhook-store.herokuapp.com"
      : window.location.origin;

  const [webhookStoreUrl, setWebhooksStoreUrl] = useStateInLocalStorage(
    "webhookStoreUrl",
    defaultWebhookStoreUrl,
    isValidHttpUrl
  );

  const [debugUrl, setDebugUrl] = useStateInLocalStorage(
    "debugUrl",
    "http://localhost:8010/proxy",
    isValidHttpUrl
  );

  return (
    <WebhookContext.Provider
      value={{
        webhookStoreUrl,
        setWebhooksStoreUrl,
        debugUrl,
        setDebugUrl,
      }}
    >
      <ApolloProvider client={createApolloClient(webhookStoreUrl)}>
        <Theme name={Theme.names.dark}>
          <Suspense fallback={<div>Loading...</div>}>
            <AppFrame topnav={<SkillsTopNav />}>
              <WebhookList />
            </AppFrame>
          </Suspense>
        </Theme>
      </ApolloProvider>
    </WebhookContext.Provider>
  );
}
