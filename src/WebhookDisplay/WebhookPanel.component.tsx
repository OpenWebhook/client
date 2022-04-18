import Button from "@pluralsight/ps-design-system-button";
import { layout } from "@pluralsight/ps-design-system-core";
import {
  PageHeadingLayout,
  PageWidthLayout,
} from "@pluralsight/ps-design-system-layout";
import { Heading, P } from "@pluralsight/ps-design-system-text";
import React, { useContext, useState } from "react";
import { Code } from "../Code";
import { forwardWebhookToLocalhost } from "../forward-to-localhost";
import { RedirectUrlContext } from "../RedirectUrl/RedirectUrl.context";
import { FlexContainer } from "./Paginator.component";
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
        <FlexContainer>
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
        </FlexContainer>

        <P>Headers</P>
        <Code code={webhook.headers} language="js" />
        <P>Body</P>
        <Code code={webhook.body} language="js" />
      </PageHeadingLayout>
    </PageWidthLayout>
  );
};
