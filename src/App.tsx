import "@pluralsight/ps-design-system-normalize";

import React from "react";

import AppFrame from "@pluralsight/ps-design-system-appframe";
import * as core from "@pluralsight/ps-design-system-core";
import Theme from "@pluralsight/ps-design-system-theme";
import { SkillsTopNav } from "./TopNav";
import WebhookList from "./WebhookList";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apollo.client";

// https://coolors.co/23f0c7-fb6107-f3de2c-5c8001-fbb02d

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Theme name={Theme.names.dark}>
        <ExampleFrame>
          <div style={{ background: core.colorsBlack }}>
            <WebhookList />
          </div>
        </ExampleFrame>
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
