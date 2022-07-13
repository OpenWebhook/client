import { Label } from "@pluralsight/ps-design-system-text";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pulser } from "./Pulser.component";

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
      <Pulser />
    </div>
  );
}
