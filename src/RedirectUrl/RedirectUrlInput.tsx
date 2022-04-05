import { Label } from "@pluralsight/ps-design-system-text";
import TextInput from "@pluralsight/ps-design-system-textinput";
import React from "react";
import { RedirectUrlContext } from "./redirect-url-context";

export function RedirectUrlInput() {
  return (
    <>
      <Label
        size={Label.sizes.xSmall}
        style={{ marginRight: "8px", marginLeft: "8px" }}
      >
        Redirect URL:
      </Label>
      <RedirectUrlContext.Consumer>
        {({ value, setValue }) => (
          <TextInput
            appearance={TextInput.appearances.subtle}
            placeholder="localhost:9000"
            size={TextInput.sizes.small}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          ></TextInput>
        )}
      </RedirectUrlContext.Consumer>
    </>
  );
}
