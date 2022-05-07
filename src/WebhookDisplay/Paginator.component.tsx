import Button from "@pluralsight/ps-design-system-button";
import { layout } from "@pluralsight/ps-design-system-core";
import Dropdown from "@pluralsight/ps-design-system-dropdown";
import {
  CaretLeftIcon,
  CaretRightIcon,
} from "@pluralsight/ps-design-system-icon";
import { P } from "@pluralsight/ps-design-system-text";
import React from "react";
import { TableInstance } from "react-table";
import { Webhook } from "./WebhookList.component";

export interface PaginatorProps {
  perPageOptions?: number[];
  table: TableInstance<Webhook>;
}

export const FlexContainer: React.FC = (props) => (
  <div
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    {...props}
  />
);

const HorzSpacer: React.FC = (props) => (
  <div
    style={{ display: "inline-block", width: layout.spacingSmall }}
    {...props}
  />
);

export const Paginator: React.FC<PaginatorProps> = (props) => {
  const { perPageOptions = [2, 5, 10, 15, 50], table } = props;
  // @ts-ignore
  const { pageIndex, pageSize } = table.state;

  // @ts-ignore
  const handlePrevPage = () => table.previousPage();
  // @ts-ignore
  const handleNextPage = () => table.nextPage();

  const total = table.rows.length;
  const cursorStart = pageIndex * pageSize + 1;
  const cursorEnd = Math.min(cursorStart + pageSize - 1, total);

  return (
    <div
      style={{
        display: "flex",
        marginBottom: layout.spacingMedium,
      }}
    >
      <Button
        appearance="secondary"
        // @ts-ignore
        disabled={!table.canPreviousPage}
        icon={<CaretLeftIcon />}
        onClick={handlePrevPage}
        title="Previous page"
      />
      <HorzSpacer />
      <Button
        appearance="secondary"
        // @ts-ignore
        disabled={!table.canNextPage}
        icon={<CaretRightIcon />}
        onClick={handleNextPage}
        title="Next page"
      />

      <HorzSpacer />

      <P>
        {cursorStart.toLocaleString()}-{cursorEnd.toLocaleString()} of{" "}
        {total.toLocaleString()}
      </P>

      <HorzSpacer />

      <Dropdown
        appearance="subtle"
        onChange={(_evt, value) => {
          //@ts-ignore
          table.setPageSize(Number(value));
        }}
        menu={
          <>
            {perPageOptions.map((option) => (
              <Dropdown.Item key={option} value={option}>
                {String(option) + " rows"}
              </Dropdown.Item>
            ))}
          </>
        }
        value={pageSize}
      />
    </div>
  );
};
