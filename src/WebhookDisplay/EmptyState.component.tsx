import React, { useMemo } from "react";
import EmptyState from "@pluralsight/ps-design-system-emptystate";
import { CopyButton } from "./CopyButton.component";

const Emptystate = ({ webhookStoreUrl }: { webhookStoreUrl: string }) => {
  const curlCommand = useMemo(
    () =>
      `curl -X POST ${webhookStoreUrl} -d 'name=Coucou' -d 'email=contact@openwebhook.io' --header "X-MyHeader: 123"`,
    [webhookStoreUrl]
  );

  return (
    <EmptyState
      style={{ height: "calc(100vh - 48px)" }}
      heading={<EmptyState.Heading>Your store is empty</EmptyState.Heading>}
      caption={
        <EmptyState.Caption>
          Try sending a request to your store {webhookStoreUrl}. <br />{" "}
          {curlCommand}
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
