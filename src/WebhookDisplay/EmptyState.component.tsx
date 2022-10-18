import React, { useMemo } from "react";
import EmptyState from "@pluralsight/ps-design-system-emptystate";
import { CopyButton } from "./CopyButton.component";

const Emptystate = ({ webhookStoreUrl }: { webhookStoreUrl: string }) => {
  const curlCommand = useMemo(
    () =>
      `curl -X POST ${webhookStoreUrl}/third-party/webhook/path -d 'generic-property=foo' -d 'generic-property2=bar' --header 'X-generic-header: baz'`,
    [webhookStoreUrl]
  );

  return (
    <EmptyState
      style={{ height: "calc(100vh - 48px)" }}
      heading={
        <EmptyState.Heading>
          1. Receive webhooks from third parties
          <br />
          2. Analyse them
          <br />
          3. Convey them on your localhost
        </EmptyState.Heading>
      }
      caption={
        <EmptyState.Caption>
          Try sending a third party webhook to your store.
        </EmptyState.Caption>
      }
      illustration={
        <EmptyState.Illustration name={EmptyState.Illustration.names.magnify} />
      }
      actions={
        <EmptyState.Actions>
          <CopyButton text={curlCommand} />
        </EmptyState.Actions>
      }
    />
  );
};

export default Emptystate;
