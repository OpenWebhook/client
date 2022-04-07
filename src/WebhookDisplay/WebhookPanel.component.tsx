import Button from "@pluralsight/ps-design-system-button";
import { layout } from "@pluralsight/ps-design-system-core";
import {
  PageHeadingLayout,
  PageWidthLayout,
} from "@pluralsight/ps-design-system-layout";
import { Heading, P } from "@pluralsight/ps-design-system-text";
import React from "react";
import { Webhook } from "./WebhookList.component";

export const WebhookPanel: React.FC<{
  webhook: Webhook;
  forwardWebhookToLocalhost: (webhook: Webhook) => void;
}> = ({ webhook, forwardWebhookToLocalhost }) => {
  return (
    <PageWidthLayout
      key={"PageWidthLayout"}
      style={{ padding: `0 ${layout.spacingXSmall}` }}
    >
      <PageHeadingLayout
        key={"PageHeadingLayout"}
        style={{ padding: `${layout.spacingXSmall} 0` }}
        actions={[
          <Button
            key="forwardWebhookToLocalhost"
            onClick={() => {
              forwardWebhookToLocalhost(webhook);
            }}
          >
            Button
          </Button>,
        ]}
        heading={
          <Heading size={Heading.sizes.xSmall}>
            <h2>{webhook.path}</h2>
          </Heading>
        }
      >
        <div className="outline">
          {Object.keys(JSON.parse(webhook.body)).map(function (key, i) {
            return (
              <P key={`webhookElement${i}`}>
                {key}: {typeof JSON.parse(webhook.body)[key]}
              </P>
            );
          })}
        </div>
      </PageHeadingLayout>
    </PageWidthLayout>
  );
};
