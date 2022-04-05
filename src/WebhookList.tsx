import { layout } from "@pluralsight/ps-design-system-core";
import Avatar from "@pluralsight/ps-design-system-avatar";
import Table from "@pluralsight/ps-design-system-table";
import React, { useEffect, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { forwardWebhookToLocalhost } from "./forward-to-localhost";
import { RedirectUrlContext } from "./RedirectUrl/redirect-url-context";

export type Webhook = {
  id: string;
  path: string;
  body: string;
  headers: string;
};

const QUERY_WEBHOOKS = gql`
  query Webhooks {
    webhooks {
      id
      path
      body
      headers
    }
  }
`;

type QueryWebhook = {
  webhooks: Array<Webhook>;
};

const COMMENTS_SUBSCRIPTION = gql`
  subscription WebhookAdded {
    webhookAdded {
      id
      path
      body
      headers
    }
  }
`;

type SubscriptionWebhook = {
  webhookAdded: Array<Webhook>;
};

const largePayloadCellStyle: React.CSSProperties = {
  width: 500,
  maxWidth: 500,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const WebhookList: React.FC<{ baseUrl: string }> = (props: {
  baseUrl: string;
}) => {
  const { data, subscribeToMore } = useQuery<QueryWebhook>(QUERY_WEBHOOKS);
  useEffect(() => {
    const unsuscribe = subscribeToMore<SubscriptionWebhook>({
      document: COMMENTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }): QueryWebhook => {
        if (!subscriptionData.data) return prev;
        const newWebhook = subscriptionData.data.webhookAdded;
        return Object.assign({}, prev, {
          webhooks: [newWebhook, ...prev.webhooks],
        });
      },
    });
    return () => {
      unsuscribe();
    };
  }, []);
  console.log(data);

  const orderedWebhooks = useMemo(() => {
    return data?.webhooks?.slice().sort((a, b) => {
      return Number(b.id) - Number(a.id);
    });
  }, [data]);

  const forwardWebhookToLocalhostCreator = (webhook: Webhook) => {
    return forwardWebhookToLocalhost(props.baseUrl, webhook);
  };

  return (
    <div style={{ height: 700 }}>
      <Table scrollable>
        <Table.Head>
          <Table.Row>
            <Table.Header role="columnheader" scope="col" sticky>
              Id
            </Table.Header>
            <Table.Header role="columnheader" scope="col" sticky>
              Path
            </Table.Header>
            <Table.Header
              style={largePayloadCellStyle}
              role="columnheader"
              scope="col"
              sticky
            >
              Body
            </Table.Header>
            <Table.Header
              style={largePayloadCellStyle}
              role="columnheader"
              scope="col"
              sticky
            >
              Headers
            </Table.Header>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {orderedWebhooks &&
            orderedWebhooks.map((webhook, i) => (
              <Table.Row
                key={i}
                onClick={() => {
                  forwardWebhookToLocalhostCreator(webhook);
                }}
              >
                <Table.Header role="rowheader" scope="row">
                  <FlexContainer>
                    <Avatar alt="avatar" name={`${webhook.id}`} size="xSmall" />
                    <HorzSpacer />
                    <span>{webhook.id}</span>
                  </FlexContainer>
                </Table.Header>
                <Table.Cell>{webhook.path}</Table.Cell>
                <Table.Cell style={largePayloadCellStyle}>
                  {webhook.body}
                </Table.Cell>
                <Table.Cell style={largePayloadCellStyle}>
                  {webhook.headers}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

const FlexContainer: React.FC = (props) => (
  <div style={{ display: "flex", alignItems: "center" }} {...props} />
);

const HorzSpacer: React.FC = (props) => (
  <div
    style={{
      display: "inline-block",
      width: layout.spacingSmall,
    }}
    {...props}
  />
);

export default WebhookList;
