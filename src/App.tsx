import "@pluralsight/ps-design-system-normalize";

import React, { Suspense } from "react";

const AppFrame = React.lazy(
  () => import("@pluralsight/ps-design-system-appframe")
);
const SkillsTopNav = React.lazy(() => import("./TopNav"));
import * as core from "@pluralsight/ps-design-system-core";
import Theme from "@pluralsight/ps-design-system-theme";

const WebhookList = React.lazy(
  () => import("./WebhookDisplay/WebhookList.component")
);
import { ApolloProvider } from "@apollo/client";
import { RedirectUrlContext } from "./RedirectUrl/RedirectUrl.context";
import { WebhookStoreUrlContext } from "./WebhookStoreUrl/WebhookStoreUrl.context";
import { createApolloClient } from "./apollo.client";
import { useStateInLocalStorage } from "./use-state-with-local-storage.hook";
import { Auth0Provider } from "@auth0/auth0-react";

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
    <Auth0Provider
      domain="sammyt.eu.auth0.com"
      clientId="paWK0IJDaDkB24vqfDBiyPsWfoVzF3GK"
      redirectUri={window.location.origin}
    >
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
              <Suspense fallback={<div>Loading...</div>}>
                <AppFrame
                  topnav={() => {
                    return <SkillsTopNav />;
                  }}
                >
                  <div style={{ background: core.colorsBlack }}>
                    <WebhookList />
                  </div>
                </AppFrame>
              </Suspense>
            </RedirectUrlContext.Provider>
          </Theme>
        </ApolloProvider>
      </WebhookStoreUrlContext.Provider>
    </Auth0Provider>
  );
}
