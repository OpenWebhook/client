import DataWell from "@pluralsight/ps-design-system-datawell";
import Link from "@pluralsight/ps-design-system-link/dist/esm/react";
import { Heading, List, P } from "@pluralsight/ps-design-system-text";
import React from "react";

export const StoreConfigInnerDialog = ({
  availableStores,
  storageLimit,
  defaultTargets,
  accessConfig,
}: {
  availableStores: { url: string; display: string }[];
  accessConfig: { type: "public" | "private"; sublabel: string };
  storageLimit?: number;
  defaultTargets?: string[];
}) => {
  return (
    <>
      <Heading>
        <h1>Store Config</h1>
      </Heading>
      <div style={{ display: "flex" }}>
        <DataWell label="Access" subLabel={accessConfig.sublabel}>
          {accessConfig.type} {accessConfig.type === "public" ? "⚠️" : null}
        </DataWell>
        {storageLimit && (
          <DataWell label="Storage Limit">{storageLimit}</DataWell>
        )}
        {defaultTargets && (
          <DataWell label="Default Target">
            <List>
              {defaultTargets.map((target) => (
                <List.Item>{target}</List.Item>
              ))}
            </List>
          </DataWell>
        )}
      </div>

      <Heading>
        <h1>Your private webhooks stores</h1>
      </Heading>

      <List>
        {availableStores.length > 0
          ? availableStores.map((store) => (
              <List.Item>
                <Link>
                  <a href={store.url}>{store.display}</a>
                </Link>
              </List.Item>
            ))
          : null}
      </List>

      <P>
        <Link>
          <a href="https://www.openwebhook.io/docs/intro/#authentication">
            WebhookStore access documentation
          </a>
        </Link>
      </P>
    </>
  );
};
