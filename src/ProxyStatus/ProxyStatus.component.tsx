import { Label } from "@pluralsight/ps-design-system-text";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pulser } from "./Pulser.component";
import Icon, { CodeIcon, HelpIcon } from "@pluralsight/ps-design-system-icon";
import Button from "@pluralsight/ps-design-system-button";
import NavItem from "@pluralsight/ps-design-system-navitem";

const openProxyCommand = "npx webhook-store-cli --noOpen";

export function ProxyStatus() {
  const [status, setStatus] = useState<"unkown" | "OK" | "Offline">("unkown");
  useEffect(() => {
    const updateStatus = () =>
      axios
        .get("http://localhost:8010/health")
        .then(() => setStatus("OK"))
        .catch(() => setStatus("Offline"));

    updateStatus();
    const interval = setInterval(updateStatus, 2000);

    return () => clearInterval(interval);
  });

  return (
    <NavItem
      key={"ProxyStatus"}
      onClick={() => {
        navigator.clipboard.writeText(openProxyCommand).then(() => {
          alert(
            "You can start the local proxy with the following command: \n" +
              openProxyCommand +
              "\n(Already copied to your clipboard)"
          );
        });
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {status === "OK" ? (
          <>
            <Label
              size={Label.sizes.xSmall}
              style={{ marginRight: "8px", marginLeft: "8px" }}
            >
              Localhost proxy status: {status}
            </Label>
            <Pulser />
          </>
        ) : null}
        {status === "Offline" ? (
          <>
            <Label
              size={Label.sizes.xSmall}
              style={{ marginRight: "8px", marginLeft: "8px" }}
            >
              Debug webhooks on your localhost
            </Label>
            <HelpIcon size={Icon.sizes.xSmall} />
          </>
        ) : null}
      </div>
    </NavItem>
  );
}
