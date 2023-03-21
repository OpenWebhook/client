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
  accessConfig: { type: "public" | "private" };
  storageLimit?: number;
  defaultTargets?: string[];
}) => {
  console.log(defaultTargets, accessConfig);
  const accessConfigSublabel =
    accessConfig.type === "public" ? "Anyone with the link" : "Only you";
  return (
    <>
      <Heading>
        <h1>Store Config</h1>
      </Heading>
      <div style={{ display: "flex" }}>
        <DataWell label="Access" subLabel={accessConfigSublabel}>
          {accessConfig.type} {accessConfig.type === "public" ? "⚠️" : null}
        </DataWell>
        {storageLimit && (
          <DataWell label="Storage Limit">100 webhooks</DataWell>
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
