import { Label } from "@pluralsight/ps-design-system-text";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pulser } from "./Pulser.component";

export function ProxyStatus() {
  //   const status = await axios.get("http://localhost:8010/healthcheck");
  //   console.log(status);
  const [status, setStatus] = useState<"unkown" | "OK" | "KO">("unkown");
  useEffect(() => {
    axios
      .get("http://localhost:8010/health")
      .then(() => setStatus("OK"))
      .catch(() => setStatus("KO"));
  });

  console.log(status);
  return (
    <div style={{ display: "flex" }}>
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
