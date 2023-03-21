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

export const StoreConfigNavItem = () => {
  const [isClicked, setClicked] = useState<boolean>(false);

  const [authConfig, setAuthConfig] = useState<{ protected: boolean }>({
    protected: false,
  });
  const [storeConfig, setStoreConfig] = useState<{
    maxNumberOfWebhookPerHost?: number;
    defaultTarget?: string[];
  }>({});

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
    getAuthConfig();
    getStoreConfig();
  }, []);

  async function getAuthConfig() {
    const initialiseAuthConfig = await get("auth-metadata");
    if (response.ok) setAuthConfig(initialiseAuthConfig);
  }

  async function getStoreConfig() {
    const initialiseStoreConfig = await get("store-metadata");
    if (response.ok) setStoreConfig(initialiseStoreConfig);
  }

  const accessConfig = {
    type: authConfig.protected ? "private" : "public",
    sublabel: authConfig.protected ? "Only you" : "Anyone with the link",
  } as const;
  const availableStores = identityToken
    ? [
        {
          url: `https://${identityToken.payload.name}.github-org.webhook.store/?access_token=${idToken}`,
          display: `${identityToken.payload.name}.github-org.webhook.store`,
        },
        ...identityToken.payload.ghOrganisations.map((orgName) => ({
          url: `https://${orgName}.github-org.webhook.store/?access_token=${idToken}`,
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
          />
        </Dialog>
      }
      when={isClicked}
    >
      <Button
        appearance={Button.appearances.flat}
        onClick={(_) => setClicked(!isClicked)}
      >
        <Label size={Label.sizes.xSmall}>Store Config ⚠️</Label>
      </Button>
    </Below>
  );
};
