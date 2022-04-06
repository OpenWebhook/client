import { layout } from "@pluralsight/ps-design-system-core";
import Table from "@pluralsight/ps-design-system-table";
import React from "react";
import Avatar from "@pluralsight/ps-design-system-avatar";
import { Webhook } from "./WebhookList.component";

const largePayloadCellStyle: React.CSSProperties = {
  width: 500,
  maxWidth: 500,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
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

export const WebhookTable: React.FC<{
  webhooks: Webhook[];
  forwardWebhookToLocalhostCreator: (arg: Webhook) => void;
}> = ({ webhooks, forwardWebhookToLocalhostCreator }) => {
  return (
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
        {webhooks &&
          webhooks.map((webhook, i) => (
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
  );
};
