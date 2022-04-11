import { AsideLayout } from "@pluralsight/ps-design-system-layout";
import React, { useContext, useState } from "react";
import { forwardWebhookToLocalhost } from "../forward-to-localhost";
import { RedirectUrlContext } from "../RedirectUrl/RedirectUrl.context";
import { Webhook } from "./WebhookList.component";
import { WebhookPanel } from "./WebhookPanel.component";
import { WebhookTable } from "./WebhookTable.component";

export const WebhookPage: React.FC<{ webhooks: Webhook[] }> = ({
  webhooks,
}) => {
  const [selectedRow, setSelectedRow] = useState(0);

  return (
    <AsideLayout
      aside={
        <AsideLayout.Aside>
          <WebhookPanel webhook={webhooks[selectedRow]} />
        </AsideLayout.Aside>
      }
      asidePosition={AsideLayout.asidePositions.last}
      main={
        <AsideLayout.Main>
          <div style={{ height: "calc(100vh - 48px)" }}>
            <WebhookTable webhooks={webhooks} setSelectedRow={setSelectedRow} />
          </div>
        </AsideLayout.Main>
      }
    />
  );
};
