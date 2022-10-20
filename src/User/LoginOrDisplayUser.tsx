import React, { useCallback, useContext, useEffect } from "react";
import NavUser from "@pluralsight/ps-design-system-navuser";
import { decodeJWT } from "../utils/decode-jwt";
import { ACCESS_TOKEN_KEY, IDENTITY_TOKEN_KEY } from "../local-storage";

const getIdentityTokenFromStorageAndCleanUrl = (): string | null => {
  const storedIdentityToken = localStorage.getItem(IDENTITY_TOKEN_KEY);
  if (storedIdentityToken) {
    return storedIdentityToken;
  }
  const queryParams = new URLSearchParams(window.location.search);
  const identityTokenFromUrl = queryParams.get("access_token");
  if (identityTokenFromUrl) {
    localStorage.setItem(IDENTITY_TOKEN_KEY, identityTokenFromUrl);
    return identityTokenFromUrl;
  }

  return null;
};

export const LoginOrDisplayUser = () => {
  const identityToken = getIdentityTokenFromStorageAndCleanUrl();

  const disconnect = useCallback(() => {
    localStorage.removeItem(IDENTITY_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.location.href = "/";
  }, []);

  useEffect(() => {
    const autoredirectOnGithubAuth =
      window.location.hostname === "github.webhook.store";
    if (autoredirectOnGithubAuth) {
      window.location.href = `${
        import.meta.env.VITE_AUTH_TENANT_URL
      }/oauth/login`;
    }
  }, []);

  if (identityToken) {
    const decodedToken =
      decodeJWT<{ name: string; picture: string }, any>(identityToken);
    const name = decodedToken.payload.name;
    const pictureUrl = decodedToken.payload.picture;
    return <NavUser name={name} src={pictureUrl} onClick={disconnect} />;
  }

  return (
    <NavUser
      name="Login"
      onClick={() => {
        window.location.href = `${
          import.meta.env.VITE_AUTH_TENANT_URL
        }/oauth/login`;
      }}
    />
  );
};
