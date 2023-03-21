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
import posthog from "posthog-js";
import { WebhookStoreUrlContext } from "../NavBar/WebhookStoreUrl/WebhookStoreUrl.context";
import { UpdateQueryFn } from "@apollo/client/core/watchQueryOptions";

const largePayloadCellStyle: React.CSSProperties = {
  minWidth: 200,
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
  query Webhooks($first: Int!, $path: String) {
    webhooks(first: $first, path: $path) {
      id
      path
      body
      headers
      receivedAt
    }
  }
`;

type QueryWebhook = {
  webhooks: Array<Webhook> | null;
};

const useBuildColumns = (data: QueryWebhook | undefined) =>
  React.useMemo<Column<Webhook>[]>(
    () => [
      {
        Header: "Id",
        accessor: (webhook: Webhook) => webhook.id.substring(0, 11),
        title: "Id",
        style: { minWidth: "140px" },
      },
      {
        Header: "Path",
        accessor: (webhook: Webhook) => webhook.path,
        title: "Path",
        style: largePayloadCellStyle,
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
        style: { minWidth: "180px" },
      },
    ],
    [data]
  );

const useBuildTable = (data: QueryWebhook | undefined) => {
  const columns = useBuildColumns(data);

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

  return { table, orderedWebhooks };
};

const subscribeToMoreUpdateQuery =
  (path: string | undefined): UpdateQueryFn =>
  (prev, { subscriptionData }): QueryWebhook => {
    const baseUrl = "http://localhost:8010/proxy";
    if (!subscriptionData.data) {
      return prev;
    }
    if (path && subscriptionData.data.webhookAdded.path != path) {
      return prev;
    }
    const newWebhook = subscriptionData.data.webhookAdded;
    try {
      void forwardWebhookToLocalhost(baseUrl, newWebhook);
    } catch (err) {
      console.error(err);
    }
    posthog.capture("New webhook received", { webhookId: newWebhook.id });
    return Object.assign({}, prev, {
      webhooks: [newWebhook, ...(prev.webhooks || [])],
    });
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
  const path = useMemo(
    () =>
      window.location.pathname === "/" ? undefined : window.location.pathname,
    [window.location.pathname]
  );
  const { data, subscribeToMore } = useQuery<QueryWebhook>(QUERY_WEBHOOKS, {
    variables: { first: 100, path },
  });
  const { value: webhookStoreUrl } = useContext(WebhookStoreUrlContext);
  useEffect(() => {
    const unsuscribe = subscribeToMore<SubscriptionWebhook>({
      document: COMMENTS_SUBSCRIPTION,
      updateQuery: subscribeToMoreUpdateQuery(path),
    });
    return () => {
      unsuscribe();
    };
  }, [subscribeToMore]);
  const { table, orderedWebhooks } = useBuildTable(data);
  return orderedWebhooks && orderedWebhooks.length > 0 ? (
    <WebhookPage webhooks={orderedWebhooks} table={table} />
  ) : (
    <Emptystate webhookStoreUrl={webhookStoreUrl} />
  );
};

export default WebhookList;
