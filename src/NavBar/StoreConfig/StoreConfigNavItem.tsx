import { Label } from "@pluralsight/ps-design-system-text";
import { Below } from "@pluralsight/ps-design-system-position";

import React, { useContext, useEffect, useState } from "react";
import Button from "@pluralsight/ps-design-system-button";
import { StoreConfigInnerDialog } from "./StoreConfigDialog";
import Dialog from "@pluralsight/ps-design-system-dialog";
import useFetch from "use-http";
import { WebhookStoreUrlContext } from "../WebhookStoreUrl/WebhookStoreUrl.context";
import { ACCESS_TOKEN_KEY, IDENTITY_TOKEN_KEY } from "../../local-storage";
import { decodeJWT } from "../../utils/decode-jwt";

export type AuthMetadata =
  | { protected: true; protectionRule: "hostname webhook.store" }
  | { protected: true; protectionRule: "github-org"; ghOrg: string }
  | { protected: false };

export const StoreConfigNavItem = () => {
  const [isClicked, setClicked] = useState<boolean>(false);

  const [authConfig, setAuthConfig] = useState<AuthMetadata>({
    protected: false,
  });
  const [storeConfig, setStoreConfig] = useState<{
    maxNumberOfWebhookPerHost?: number;
    defaultTarget?: string[];
    userHasAccessToStore: boolean;
  }>({ userHasAccessToStore: false });

  const { value: webhookStoreUrl } = useContext(WebhookStoreUrlContext);
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const { get, response } = useFetch(webhookStoreUrl, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  const idToken = localStorage.getItem(IDENTITY_TOKEN_KEY);
  const identityToken =
    idToken &&
    decodeJWT<{ name: string; ghOrganisations: string[] }, any>(idToken);

  useEffect(() => {
    getConfigs();
  }, []);

  async function getConfigs() {
    const initialiseAuthConfig = await get("auth-metadata");
    if (response.ok) setAuthConfig(initialiseAuthConfig);
    const initialiseStoreConfig = await get("store-metadata");
    if (response.ok)
      setStoreConfig({ ...initialiseStoreConfig, userHasAccessToStore: true });
  }

  const accessConfig = describeAccessFromAuthConfig(
    authConfig,
    webhookStoreUrl
  );
  const availableStores = identityToken
    ? [
        {
          url: `https://${identityToken.payload.name}.github-org.webhook.store/?access_token=${idToken}`,
          display: `${identityToken.payload.name}.github-org.webhook.store`,
        },
        ...identityToken.payload.ghOrganisations.map((orgName) => ({
          url: `https://${orgName}.github.webhook.store/?access_token=${idToken}`,
          display: `${orgName}.github-org.webhook.store`,
        })),
      ]
    : [
        {
          url: "https://github.webhook.store",
          display: "github.webhook.store",
        },
      ];
  const defaultTargets = storeConfig.defaultTarget;
  const storageLimit = storeConfig.maxNumberOfWebhookPerHost;

  return (
    <Below
      show={
        <Dialog>
          <StoreConfigInnerDialog
            accessConfig={accessConfig}
            availableStores={availableStores}
            defaultTargets={defaultTargets}
            storageLimit={storageLimit}
            userHasAccessToStore={storeConfig.userHasAccessToStore}
          />
        </Dialog>
      }
      when={isClicked}
    >
      <Button
        appearance={Button.appearances.flat}
        onClick={(_) => setClicked(!isClicked)}
      >
        <Label size={Label.sizes.xSmall}>
          Store Config {authConfig.protected ? null : "⚠️"}
        </Label>
      </Button>
    </Below>
  );
};

const describeAccessFromAuthConfig = (
  authConfig: AuthMetadata,
  webhookStoreUrl: string
): { type: "public" | "private"; sublabel: string } => {
  if (!authConfig.protected) {
    return { type: "public", sublabel: "Anyone with the link" };
  }

  if (authConfig.protectionRule === "github-org") {
    return {
      type: "private",
      sublabel: `Only members of ${authConfig.ghOrg} on GitHub`,
    };
  }

  if (authConfig.protectionRule === "hostname webhook.store") {
    const webhookStoreDomain = new URL(webhookStoreUrl).hostname;
    if (webhookStoreDomain.endsWith(".github.webhook.store")) {
      const githubUserName =
        webhookStoreDomain.split(".")[webhookStoreDomain.split(".").length - 4];
      return {
        type: "private",
        sublabel: `Only Github user ${githubUserName}`,
      };
    }
    if (webhookStoreDomain.endsWith(".github-org.webhook.store")) {
      const githubOrgaName =
        webhookStoreDomain.split(".")[webhookStoreDomain.split(".").length - 4];
      return {
        type: "private",
        sublabel: `Only members of ${githubOrgaName} on GitHub`,
      };
    }
    return { type: "public", sublabel: "Anyone with the link" };
  }

  return { type: "public", sublabel: "Anyone with the link" };
};
