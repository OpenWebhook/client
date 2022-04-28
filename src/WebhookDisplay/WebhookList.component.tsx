import React, { useContext, useEffect, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import Emptystate from "./EmptyState.component";
import { WebhookPage } from "./WebhookPage.component";

import {
  Column,
  usePagination,
  UsePaginationState,
  useTable,
} from "react-table";
import { forwardWebhookToLocalhost } from "../forward-to-localhost";
import { RedirectUrlContext } from "../RedirectUrl/RedirectUrl.context";

const largePayloadCellStyle: React.CSSProperties = {
  width: 300,
  maxWidth: 300,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export type Webhook = {
  id: string;
  path: string;
  body: string;
  headers: string;
  receivedAt: string;
};

const QUERY_WEBHOOKS = gql`
  query Webhooks {
    webhooks(first: 1000) {
      id
      path
      body
      headers
      receivedAt
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
      receivedAt
    }
  }
`;

type SubscriptionWebhook = {
  webhookAdded: Webhook;
};

const WebhookList: React.FC = () => {
  const { data, subscribeToMore } = useQuery<QueryWebhook>(QUERY_WEBHOOKS);
  const { value: baseUrl } = useContext(RedirectUrlContext);

  useEffect(() => {
    const unsuscribe = subscribeToMore<SubscriptionWebhook>({
      document: COMMENTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }): QueryWebhook => {
        if (!subscriptionData.data) return prev;
        const newWebhook = subscriptionData.data.webhookAdded;
        try {
          void forwardWebhookToLocalhost(baseUrl, newWebhook);
        } catch (err) {
          console.error(err);
        }
        return Object.assign({}, prev, {
          webhooks: [newWebhook, ...prev.webhooks],
        });
      },
    });
    return () => {
      unsuscribe();
    };
  }, [subscribeToMore]);

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
        Header: "Received at",
        accessor: (webhook: Webhook) =>
          new Date(webhook.receivedAt).toLocaleString(),
        title: "Received at",
      },
    ],
    [data]
  );

  const orderedWebhooks = useMemo(() => {
    return (
      data?.webhooks?.slice().sort((a, b) => {
        return Number(b.id) - Number(a.id);
      }) || []
    );
  }, [data]);

  const initialState: UsePaginationState<Webhook> = {
    pageSize: 15,
    pageIndex: 0,
  };

  const table = useTable(
    {
      columns,
      data: orderedWebhooks,
      // @ts-ignore
      initialState,
    },
    usePagination
  );

  return orderedWebhooks && orderedWebhooks.length > 0 ? (
    <WebhookPage webhooks={orderedWebhooks} table={table} />
  ) : (
    <Emptystate />
  );
};

export default WebhookList;
