import React, { useEffect, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import Emptystate from "./EmptyState.component";
import { WebhookPage } from "./WebhookPage.component";

import { Column, useTable } from "react-table";

const largePayloadCellStyle: React.CSSProperties = {
  width: 500,
  maxWidth: 500,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

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

const WebhookList: React.FC = () => {
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

  const columns = React.useMemo<Column<Webhook>[]>(
    () => [
      {
        Header: "Id",
        accessor: (webhook: Webhook) => webhook.id,
        title: "Id",
      },
      {
        Header: "Path",
        accessor: (webhook: Webhook) => webhook.path,
        title: "Path",
      },
      {
        Header: "Body",
        accessor: (webhook: Webhook) => webhook.body,
        title: "Body",
        style: largePayloadCellStyle,
      },
      {
        Header: "Headers",
        accessor: (webhook: Webhook) => webhook.headers,
        title: "Headers",
        style: largePayloadCellStyle,
      },
    ],
    []
  );

  const orderedWebhooks =
    useMemo(() => {
      return data?.webhooks?.slice().sort((a, b) => {
        return Number(b.id) - Number(a.id);
      });
    }, [data]) || [];

  const table = useTable<Webhook>({ columns, data: orderedWebhooks });

  return orderedWebhooks && orderedWebhooks.length > 0 ? (
    <WebhookPage webhooks={orderedWebhooks} table={table} />
  ) : (
    <Emptystate />
  );
};

export default WebhookList;
