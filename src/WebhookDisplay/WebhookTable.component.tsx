import { layout } from "@pluralsight/ps-design-system-core";
import Table from "@pluralsight/ps-design-system-table";
import React from "react";
import Avatar from "@pluralsight/ps-design-system-avatar";
import { Webhook } from "./WebhookList.component";
import { HeaderGroup, TableInstance } from "react-table";

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
  setSelectedRow: (webhookIndex: number) => void;
  table: TableInstance<Webhook>;
}> = ({ table, setSelectedRow }) => {
  return (
    <Table scrollable>
      <Table.Head>
        {table.headerGroups.map((group) => (
          <Table.Row {...group.getHeaderGroupProps()}>
            {group.headers.map((column: HeaderGroup<Webhook>) => (
              <Table.Header
                scope="col"
                // @ts-ignore
                {...column.getHeaderProps({ title: column.title })}
                role="columnheader"
                key={`webhookRow${column.id}`}
                // @ts-ignore
                style={column.style}
              >
                {column.render("Header")}
              </Table.Header>
            ))}
          </Table.Row>
        ))}
      </Table.Head>

      <Table.Body {...table.getTableBodyProps}>
        {
          //@ts-ignore
          table.page
            //@ts-ignore
            .map((row) => {
              table.prepareRow(row);
              return row;
            })
            //@ts-ignore
            .map((row, i) => (
              <Table.Row
                {...row.getRowProps()}
                key={`webhookRow${row.id}`}
                onClick={() => {
                  setSelectedRow(i);
                }}
              >
                {
                  //@ts-ignore
                  row.cells.map((cell) => (
                    // @ts-ignore
                    <Table.Cell
                      {...cell.getCellProps()}
                      style={cell.column.style}
                    >
                      {cell.render("Cell")}
                    </Table.Cell>
                  ))
                }
              </Table.Row>
            ))
        }
      </Table.Body>
    </Table>
  );
};
