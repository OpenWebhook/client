import React, { useCallback } from "react";
import NavUser from "@pluralsight/ps-design-system-navuser";
import { decodeJWT } from "../utils/decode-jwt";

const getAccessTokenFromStorageAndCleanUrl = (): string | null => {
  const storedAccessToken = localStorage.getItem("accessToken");
  if (storedAccessToken) {
    return storedAccessToken;
  }
  const queryParams = new URLSearchParams(window.location.search);
  const accessTokenFromUrl = queryParams.get("access_token");
  if (accessTokenFromUrl) {
    localStorage.setItem("accessToken", accessTokenFromUrl);
    return accessTokenFromUrl;
  }

  return null;
};

export const LoginOrDisplayUser = () => {
  const accessToken = getAccessTokenFromStorageAndCleanUrl();

  const disconnect = useCallback(() => {
    localStorage.removeItem("accessToken");
    location.reload();
  }, []);

  if (accessToken) {
    const decodedToken =
      decodeJWT<{ name: string; picture: string }, any>(accessToken);
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
