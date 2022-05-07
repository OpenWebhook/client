import Button from "@pluralsight/ps-design-system-button";
import { layout } from "@pluralsight/ps-design-system-core";
import {
  PageHeadingLayout,
  PageWidthLayout,
} from "@pluralsight/ps-design-system-layout";
import Link from "@pluralsight/ps-design-system-link";
import { Heading, P } from "@pluralsight/ps-design-system-text";
import React, { useContext, useState } from "react";
import { Code } from "../Code";
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
      style={{
        padding: `0 ${layout.spacingXSmall}`,
        height: "calc(100vh - 48px)",
        overflow: "scroll",
      }}
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            key="forwardWebhookToLocalhost"
            onClick={() => {
              forwardWebhookToLocalhost(baseUrl, webhook, setWebhookResponse);
            }}
          >
            Send
          </Button>
          <P style={{ margin: 0, padding: `0 ${layout.spacingXSmall}` }}>
            {webhookResponse.code}
          </P>
          <P style={{ margin: 0, padding: `0 ${layout.spacingXSmall}` }}>
            {webhookResponse.error}
          </P>
          {webhookResponse?.error && (
            <Link>
              <a
                href={
                  "https://docs.openwebhook.io/docs/troubleshoot-replay-webhook"
                }
              >
                Trouble shoot CORS issue
              </a>
            </Link>
          )}
        </div>
      </PageHeadingLayout>
      <P>Headers</P>
      <Code code={webhook.headers} language="js" />
      <P>Body</P>
      <Code code={webhook.body} language="js" />
    </PageWidthLayout>
  );
};
