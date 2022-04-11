import "@pluralsight/ps-design-system-normalize";

import React from "react";

import AppFrame from "@pluralsight/ps-design-system-appframe";
import * as core from "@pluralsight/ps-design-system-core";
import Theme from "@pluralsight/ps-design-system-theme";
import { SkillsTopNav } from "./TopNav";
import WebhookList from "./WebhookDisplay/WebhookList.component";
import { ApolloProvider } from "@apollo/client";
import { RedirectUrlContext } from "./RedirectUrl/RedirectUrl.context";
import { WebhookStoreUrlContext } from "./WebhookStoreUrl/WebhookStoreUrl.context";
import { createApolloClient } from "./apollo.client";
import { useStateInLocalStorage } from "./use-state-with-local-storage.hook";

// https://coolors.co/23f0c7-fb6107-f3de2c-5c8001-fbb02d

export default function App() {
  const [redirectUrl, setRedirectUrl] = useStateInLocalStorage(
    "redirectUrl",
    "http://localhost:8010/proxy"
  );

  const [webhookStoreUrl, setWebhooksStoreUrl] = useStateInLocalStorage(
    "webhookStoreUrl",
    "https://webhook-store.herokuapp.com"
  );

  return (
    <WebhookStoreUrlContext.Provider
      value={{
        value: webhookStoreUrl,
        setValue: setWebhooksStoreUrl,
      }}
    >
      <ApolloProvider client={createApolloClient(webhookStoreUrl)}>
        <Theme name={Theme.names.dark}>
          <RedirectUrlContext.Provider
            value={{
              value: redirectUrl,
              setValue: setRedirectUrl,
            }}
          >
            <AppFrame
              topnav={() => {
                return <SkillsTopNav />;
              }}
            >
              <div style={{ background: core.colorsBlack }}>
                <WebhookList />
              </div>
            </AppFrame>
          </RedirectUrlContext.Provider>
        </Theme>
      </ApolloProvider>
    </WebhookStoreUrlContext.Provider>
  );
}
