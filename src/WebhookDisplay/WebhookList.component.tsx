import React, { useEffect, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { forwardWebhookToLocalhost } from "../forward-to-localhost";
import { WebhookTable } from "./WebhookTable.component";
import { AsideLayout } from "@pluralsight/ps-design-system-layout";
import { WebhookPanel } from "./WebhookPanel.component";

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
    <AsideLayout
      aside={
        <AsideLayout.Aside>
          <WebhookPanel />
        </AsideLayout.Aside>
      }
      asidePosition={AsideLayout.asidePositions.last}
      main={
        <AsideLayout.Main>
          <div style={{ height: 700 }}>
            <WebhookTable
              webhooks={orderedWebhooks || []}
              forwardWebhookToLocalhostCreator={
                forwardWebhookToLocalhostCreator
              }
            />
          </div>
        </AsideLayout.Main>
      }
    />
  );
};

export default WebhookList;
