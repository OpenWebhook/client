import { Label } from "@pluralsight/ps-design-system-text";
import { Below } from "@pluralsight/ps-design-system-position";
import Dialog from "@pluralsight/ps-design-system-dialog";

import React, { useState } from "react";
import Button from "@pluralsight/ps-design-system-button";

export const StoreConfigNavItem = () => {
  const [isClicked, setClicked] = useState<boolean>(false);

  return (
    <Below show={<Dialog>Store Config</Dialog>} when={isClicked}>
      <Button
        appearance={Button.appearances.flat}
        onClick={(_) => setClicked(!isClicked)}
      >
        <Label size={Label.sizes.xSmall}>Store Config ⚠️</Label>
      </Button>
    </Below>
  );
};
