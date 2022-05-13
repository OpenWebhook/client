import React, { useMemo } from "react";
import EmptyState from "@pluralsight/ps-design-system-emptystate";
import Button from "@pluralsight/ps-design-system-button";

const Emptystate = ({ webhookStoreUrl }: { webhookStoreUrl: string }) => {
  const curlCommand = useMemo(
    () =>
      `POST ${webhookStoreUrl} -d 'name=Coucou' -d 'email=contact@openwebhook.io' --header "X-MyHeader: 123"`,
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
          <Button
            appearance={Button.appearances.stroke}
            onClick={() => {
              navigator.clipboard.writeText(curlCommand);
              alert("Copied " + curlCommand);
            }}
          >
            Copy curl
          </Button>
        </EmptyState.Actions>
      }
    />
  );
};

export default Emptystate;
