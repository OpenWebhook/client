import { layout } from "@pluralsight/ps-design-system-core";
import {
  EqualColumnLayout,
  PageWidthLayout,
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
    <EqualColumnLayout
      count={EqualColumnLayout.counts.two}
      style={{ flexWrap: "nowrap" }}
    >
      <PageWidthLayout
        key={"PageWidthLayout"}
        style={{
          padding: `0 ${layout.spacingXSmall}`,
          minWidth: "850px",
        }}
      >
        <WebhookTable
          webhooks={webhooks}
          setSelectedWebhook={setSelectedWebhook}
          table={table}
        />
        <FlexContainer>
          <Paginator table={table} />
        </FlexContainer>
      </PageWidthLayout>
      <WebhookPanel webhook={selectedWebhook} />
    </EqualColumnLayout>
  );
};
