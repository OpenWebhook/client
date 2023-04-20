import { Label } from "@pluralsight/ps-design-system-text";
import TextInput from "@pluralsight/ps-design-system-textinput";
import React, { useContext } from "react";
import { WebhookContext } from "../WebhookContext/WebhookContext";
import NavItem from "@pluralsight/ps-design-system-navitem";

export function WebhookStoreUrlInput() {
  const { webhookStoreUrl, setWebhooksStoreUrl } = useContext(WebhookContext);
  return (
    <NavItem key={"WebhookStoreUrlInput"}>
      <Label
        size={Label.sizes.xSmall}
        style={{ marginRight: "8px", marginLeft: "8px" }}
      >
        Webhook Store URL:
      </Label>
      <TextInput
        appearance={TextInput.appearances.subtle}
        placeholder="https://webhook-store.herokuapp.com"
        size={TextInput.sizes.small}
        defaultValue={webhookStoreUrl}
        onBlur={(event) => {
          setWebhooksStoreUrl(new URL(event.target.value).origin);
        }}
      ></TextInput>
    </NavItem>
  );
}
