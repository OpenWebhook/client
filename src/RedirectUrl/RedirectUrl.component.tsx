import { Label } from "@pluralsight/ps-design-system-text";
import TextInput from "@pluralsight/ps-design-system-textinput";
import React, { useContext } from "react";
import { RedirectUrlContext } from "./RedirectUrl.context";

export function RedirectUrlInput() {
  const { value, setValue } = useContext(RedirectUrlContext);

  return (
    <>
      <Label
        size={Label.sizes.xSmall}
        style={{ marginRight: "8px", marginLeft: "8px" }}
      >
        Redirect URL:
      </Label>
      <TextInput
        appearance={TextInput.appearances.subtle}
        placeholder="http://localhost:8010/proxy"
        size={TextInput.sizes.small}
        defaultValue={value}
        onBlur={(event) => {
          setValue(event.target.value);
        }}
      ></TextInput>
    </>
  );
}
