import { Label } from "@pluralsight/ps-design-system-text";
import TextInput from "@pluralsight/ps-design-system-textinput";
import React, { useContext } from "react";
import { WebhookStoreUrlContext } from "./WebhookStoreUrl.context";
import NavItem from "@pluralsight/ps-design-system-navitem";

export function WebhookStoreUrlInput() {
  const { value, setValue } = useContext(WebhookStoreUrlContext);
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
        defaultValue={value}
        onBlur={(event) => {
          setValue(new URL(event.target.value).origin);
        }}
      ></TextInput>
    </NavItem>
  );
}
