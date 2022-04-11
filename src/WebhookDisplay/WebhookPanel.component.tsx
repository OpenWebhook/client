import Button from "@pluralsight/ps-design-system-button";
import { layout } from "@pluralsight/ps-design-system-core";
import {
  PageHeadingLayout,
  PageWidthLayout,
} from "@pluralsight/ps-design-system-layout";
import { Heading, P } from "@pluralsight/ps-design-system-text";
import React, { useContext, useState } from "react";
import { forwardWebhookToLocalhost } from "../forward-to-localhost";
import { RedirectUrlContext } from "../RedirectUrl/RedirectUrl.context";
import { Webhook } from "./WebhookList.component";

export const WebhookPanel: React.FC<{
  webhook: Webhook;
}> = ({ webhook }) => {
  const { value: baseUrl } = useContext(RedirectUrlContext);

  const [webhookResponse, setWebhookResponse] = useState<{
    code?: number;
    error?: any;
  }>({
    code: undefined,
    error: undefined,
  });

  return (
    <PageWidthLayout
      key={"PageWidthLayout"}
      style={{ padding: `0 ${layout.spacingXSmall}` }}
    >
      <PageHeadingLayout
        key={"PageHeadingLayout"}
        style={{ padding: `${layout.spacingXSmall} 0` }}
        actions={[]}
        heading={
          <Heading size={Heading.sizes.xSmall}>
            <h2>{webhook.path}</h2>
          </Heading>
        }
      >
        <Button
          key="forwardWebhookToLocalhost"
          onClick={() => {
            forwardWebhookToLocalhost(baseUrl, webhook, setWebhookResponse);
          }}
        >
          Send
        </Button>
        <P>{webhookResponse.code}</P>
        <P>{webhookResponse.error}</P>
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
