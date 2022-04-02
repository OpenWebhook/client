import { layout } from "@pluralsight/ps-design-system-core";
import Avatar from "@pluralsight/ps-design-system-avatar";
import Table from "@pluralsight/ps-design-system-table";
import React, { useEffect, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";

const QUERY_WEBHOOKS = gql`
  query Webhooks {
    webhooks {
      id
    }
  }
`;

type QueryWebhook = { webhooks: Array<{ id: string }> };

const COMMENTS_SUBSCRIPTION = gql`
  subscription WebhookAdded {
    webhookAdded {
      id
    }
  }
`;

type SubscriptionWebhook = { webhookAdded: Array<{ id: string }> };

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
  console.log(data);

  const orderedWebhooks = useMemo(() => {
    return data?.webhooks?.slice().sort((a, b) => {
      return Number(b.id) - Number(a.id);
    });
  }, [data]);

  return (
    <div style={{ height: 700 }}>
      <Table scrollable>
        <Table.Head>
          <Table.Row>
            <Table.Header role="columnheader" scope="col" sticky>
              First name
            </Table.Header>
            <Table.Header role="columnheader" scope="col" sticky>
              Last name
            </Table.Header>
            <Table.Header role="columnheader" scope="col" sticky>
              Email
            </Table.Header>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {orderedWebhooks &&
            orderedWebhooks.map((user, i) => (
              <Table.Row key={i}>
                <Table.Header role="rowheader" scope="row">
                  <FlexContainer>
                    <Avatar alt="avatar" name={`${user.id}`} size="xSmall" />
                    <HorzSpacer />
                    <span>{user.id}</span>
                  </FlexContainer>
                </Table.Header>
                <Table.Cell>{"croute"}</Table.Cell>
                <Table.Cell>{"croute"}</Table.Cell>
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
