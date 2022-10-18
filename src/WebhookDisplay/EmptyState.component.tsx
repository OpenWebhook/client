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
        <EmptyState.Heading style={{ width: "600px" }}>
          1. We receive your third parties webhooks
          <br />
          2. You analyse them online
          <br />
          3. You replay them later on localhost
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
