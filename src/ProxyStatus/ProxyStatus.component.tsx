import { Label } from "@pluralsight/ps-design-system-text";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pulser } from "./Pulser.component";
import { CodeIcon, HelpIcon } from "@pluralsight/ps-design-system-icon";
import Button from "@pluralsight/ps-design-system-button";

const openProxyCommand = "npx webhook-store-cli --noOpen";

function HelpProxyOfflineIcon() {
  return (
    <>
      <Button
        icon={<HelpIcon />}
        size={Button.sizes.xSmall}
        onClick={() => {
          navigator.clipboard.writeText(openProxyCommand).then(() => {
            alert(
              "You can start the local proxy with the following command: \n" +
                openProxyCommand +
                "\n(Already copied to your clipboard)"
            );
          });
        }}
      ></Button>
    </>
  );
}

export function ProxyStatus() {
  const [status, setStatus] = useState<"unkown" | "OK" | "Offline">("unkown");
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://localhost:8010/health")
        .then(() => setStatus("OK"))
        .catch(() => setStatus("Offline"));
    }, 2000);

    return () => clearInterval(interval);
  });

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Label
        size={Label.sizes.xSmall}
        style={{ marginRight: "8px", marginLeft: "8px" }}
      >
        Localhost proxy status: {status}
      </Label>
      {status === "OK" ? <Pulser /> : null}
      {status === "Offline" ? <HelpProxyOfflineIcon /> : null}
    </div>
  );
}
