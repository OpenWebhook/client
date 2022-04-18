import {
  AsideLayout,
  EqualColumnLayout,
} from "@pluralsight/ps-design-system-layout";
import React, { useState } from "react";
import { TableInstance } from "react-table";
import { FlexContainer, Paginator } from "./Paginator.component";
import { Webhook } from "./WebhookList.component";
import { WebhookPanel } from "./WebhookPanel.component";
import { WebhookTable } from "./WebhookTable.component";

export const WebhookPage: React.FC<{
  webhooks: Webhook[];
  table: TableInstance<Webhook>;
}> = ({ webhooks, table }) => {
  const [selectedWebhook, setSelectedWebhook] = useState(webhooks[0]);

  return (
    <EqualColumnLayout count={EqualColumnLayout.counts.two}>
      <div style={{ height: "calc(100vh - 48px)" }}>
        <WebhookTable
          webhooks={webhooks}
          setSelectedWebhook={setSelectedWebhook}
          table={table}
        />
        <FlexContainer>
          <Paginator table={table} />
        </FlexContainer>
      </div>
      <WebhookPanel webhook={selectedWebhook} />
    </EqualColumnLayout>
  );
};
