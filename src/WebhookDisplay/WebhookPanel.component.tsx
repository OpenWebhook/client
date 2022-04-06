import Button from "@pluralsight/ps-design-system-button";
import { layout } from "@pluralsight/ps-design-system-core";
import {
  PageHeadingLayout,
  PageWidthLayout,
} from "@pluralsight/ps-design-system-layout";
import { Heading, P } from "@pluralsight/ps-design-system-text";
import React from "react";

export const WebhookPanel: React.FC = () => {
  return (
    <PageWidthLayout style={{ padding: `0 ${layout.spacingXSmall}` }}>
      <PageHeadingLayout
        style={{ padding: `${layout.spacingXSmall} 0` }}
        actions={[<Button key="btn-2">Button</Button>]}
        heading={
          <Heading size={Heading.sizes.xSmall}>
            <h2>Page title</h2>
          </Heading>
        }
      >
        <div className="outline">
          <P>Your page contents here</P>
        </div>
      </PageHeadingLayout>
    </PageWidthLayout>
  );
};
