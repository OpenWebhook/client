import "@pluralsight/ps-design-system-normalize";

import React, { useState } from "react";

import AppFrame from "@pluralsight/ps-design-system-appframe";
import * as core from "@pluralsight/ps-design-system-core";
import Theme from "@pluralsight/ps-design-system-theme";
import { SkillsTopNav } from "./TopNav";
import WebhookList from "./WebhookList";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apollo.client";
import { RedirectUrlContext } from "./RedirectUrl/redirect-url-context";

// https://coolors.co/23f0c7-fb6107-f3de2c-5c8001-fbb02d

export default function App() {
  const [redirectUrl, setRedirectUrl] = useState("http://localhost:9001");

  return (
    <ApolloProvider client={apolloClient}>
      <Theme name={Theme.names.dark}>
        <RedirectUrlContext.Provider
          value={{ value: redirectUrl, setValue: setRedirectUrl as () => {} }}
        >
          <ExampleFrame>
            <div style={{ background: core.colorsBlack }}>
              <RedirectUrlContext.Consumer>
                {(redirectUrlContextValue) => (
                  <WebhookList baseUrl={redirectUrlContextValue.value} />
                )}
              </RedirectUrlContext.Consumer>
            </div>
          </ExampleFrame>
        </RedirectUrlContext.Provider>
      </Theme>
    </ApolloProvider>
  );
}

function ExampleFrame(props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  return (
    <>
      <AppFrame
        topnav={() => {
          return <SkillsTopNav />;
        }}
      >
        {props.children}
      </AppFrame>
    </>
  );
}
