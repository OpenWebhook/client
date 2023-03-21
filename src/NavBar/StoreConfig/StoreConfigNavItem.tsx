import { Label } from "@pluralsight/ps-design-system-text";
import { Below } from "@pluralsight/ps-design-system-position";

import React, { useState } from "react";
import Button from "@pluralsight/ps-design-system-button";
import { StoreConfigInnerDialog } from "./StoreConfigDialog";
import Dialog from "@pluralsight/ps-design-system-dialog";

export const StoreConfigNavItem = () => {
  const [isClicked, setClicked] = useState<boolean>(false);

  const accessConfig = { type: "public" } as const;
  const availableStores = [{ url: "https://google.com", display: "Google" }];
  const defaultTargets = ["https://google.com", "https://google.com"];
  const storageLimit = 100;

  return (
    <Below
      show={
        <Dialog>
          <StoreConfigInnerDialog
            accessConfig={accessConfig}
            availableStores={availableStores}
            defaultTargets={defaultTargets}
            storageLimit={storageLimit}
          />
        </Dialog>
      }
      when={isClicked}
    >
      <Button
        appearance={Button.appearances.flat}
        onClick={(_) => setClicked(!isClicked)}
      >
        <Label size={Label.sizes.xSmall}>Store Config ⚠️</Label>
      </Button>
    </Below>
  );
};
