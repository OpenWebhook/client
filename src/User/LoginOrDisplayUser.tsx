import React, { useCallback } from "react";
import NavUser from "@pluralsight/ps-design-system-navuser";
import { decodeJWT } from "../utils/decode-jwt";

const getIdentityTokenFromStorageAndCleanUrl = (): string | null => {
  const storedIdentityToken = localStorage.getItem("identityToken");
  if (storedIdentityToken) {
    return storedIdentityToken;
  }
  const queryParams = new URLSearchParams(window.location.search);
  const identityTokenFromUrl = queryParams.get("access_token");
  if (identityTokenFromUrl) {
    localStorage.setItem("identityToken", identityTokenFromUrl);
    return identityTokenFromUrl;
  }

  return null;
};

export const LoginOrDisplayUser = () => {
  const identityToken = getIdentityTokenFromStorageAndCleanUrl();

  const disconnect = useCallback(() => {
    localStorage.removeItem("identityToken");
    location.reload();
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
