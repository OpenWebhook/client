import { Label } from "@pluralsight/ps-design-system-text";
import TextInput from "@pluralsight/ps-design-system-textinput";
import React from "react";
import { WebhookStoreUrlContext } from "./webhook-store-url-context";

export function WebhookStoreUrlInput() {
  return (
    <>
      <Label
        size={Label.sizes.xSmall}
        style={{ marginRight: "8px", marginLeft: "8px" }}
      >
        Redirect URL:
      </Label>
      <WebhookStoreUrlContext.Consumer>
        {({ value, setValue }) => (
          <TextInput
            appearance={TextInput.appearances.subtle}
            placeholder="webhook-store.herokuapp.com"
            size={TextInput.sizes.small}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          ></TextInput>
        )}
      </WebhookStoreUrlContext.Consumer>
    </>
  );
}
