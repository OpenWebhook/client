import DataWell from "@pluralsight/ps-design-system-datawell";
import Link from "@pluralsight/ps-design-system-link/dist/esm/react";
import { Heading, List, P } from "@pluralsight/ps-design-system-text";
import React from "react";

export const StoreConfigInnerDialog = () => {
  return (
    <>
      <Heading>
        <h1>Store Config</h1>
      </Heading>
      <div style={{ display: "flex" }}>
        <DataWell label="Access" subLabel="Anyone with the link">
          Public ⚠️
        </DataWell>
        <DataWell label="Storage Limit">100 webhooks</DataWell>
        <DataWell label="Default Target">
          <List>
            <List.Item>https://preprod.yolo.croute</List.Item>
          </List>
        </DataWell>
      </div>

      <Heading>
        <h1>Your private webhooks stores</h1>
      </Heading>

      <List>
        <List.Item>
          <Link>
            <a href="https://samox.github.webhook.store">
              samox.github.webhook.store
            </a>
          </Link>
        </List.Item>
        <List.Item>
          <Link>
            <a href="https://lendroit.github-org.webhook.store">
              lendroit.github-org.webhook.store
            </a>
          </Link>
        </List.Item>
        <List.Item>
          <Link>
            <a href="https://openwebhook.github-org.webhook.store">
              openwebhook.github-org.webhook.store
            </a>
          </Link>
        </List.Item>
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
