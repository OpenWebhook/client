import React from "react";
import EmptyState from "@pluralsight/ps-design-system-emptystate";
import Button from "@pluralsight/ps-design-system-button";

const Emptystate = () => (
  <EmptyState
    style={{ height: "calc(100vh - 48px)" }}
    heading={
      <EmptyState.Heading>Alohamora wand elf parchment</EmptyState.Heading>
    }
    caption={
      <EmptyState.Caption>
        Make sure your Webhook Store has the latest version.
      </EmptyState.Caption>
    }
    illustration={
      <EmptyState.Illustration name={EmptyState.Illustration.names.magnify} />
    }
    actions={
      <EmptyState.Actions>
        <Button appearance={Button.appearances.stroke}>Do a Thing</Button>
      </EmptyState.Actions>
    }
  />
);

export default Emptystate;
