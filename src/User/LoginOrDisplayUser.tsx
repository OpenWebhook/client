import React, { useCallback } from "react";
import NavUser from "@pluralsight/ps-design-system-navuser";
import { decodeJWT } from "../utils/decode-jwt";
import { ACCESS_TOKEN_KEY, IDENTITY_TOKEN_KEY } from "../local-storage";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";

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

const loginOauth = () => {
  window.location.href = `${import.meta.env.VITE_AUTH_TENANT_URL}/oauth/login`;
};

const registerNewWebAuthnCredential = async () => {
  const resp = await fetch("http://localhost:9000/webauthn/register");

  let attResp;
  try {
    // Pass the options to the authenticator and wait for a response
    attResp = await startRegistration(await resp.json());
  } catch (error: any) {
    // Some basic error handling
    if (error.name === "InvalidStateError") {
      alert("Error: Authenticator was probably already registered by user");
    } else {
      console.error(error);
      alert(`Error: ${error.message}`);
    }

    throw error;
  }

  // POST the response to the endpoint that calls
  // @simplewebauthn/server -> verifyRegistrationResponse()
  const verificationResp = await fetch(
    "http://localhost:9000/webauthn/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attResp),
    }
  );

  // Wait for the results of verification
  const verificationJSON = await verificationResp.json();

  // Show UI appropriate for the `verified` status
  if (verificationJSON && verificationJSON.verified) {
    alert("Success!");
  } else {
    alert(
      `Oh no, something went wrong! Response: <pre>${JSON.stringify(
        verificationJSON
      )}</pre>`
    );
  }
};

const authenticateWithWebAuthn = async () => {
  const resp = await fetch("http://localhost:9000/webauthn/authenticate");

  let asseResp;
  try {
    // Pass the options to the authenticator and wait for a response
    asseResp = await startAuthentication(await resp.json());
  } catch (error) {
    // Some basic error handling
    alert(error);
    throw error;
  }

  // POST the response to the endpoint that calls
  // @simplewebauthn/server -> verifyAuthenticationResponse()
  const verificationResp = await fetch(
    "http://localhost:9000/webauthn/authenticate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(asseResp),
    }
  );

  // Wait for the results of verification
  const verificationJSON = await verificationResp.json();
  console.log("verificationJSON", verificationJSON);
  // Show UI appropriate for the `verified` status
  if (verificationJSON && verificationJSON.verified) {
    alert("Success!");
  } else {
    alert(
      `Oh no, something went wrong! Response: <pre>${JSON.stringify(
        verificationJSON
      )}</pre>`
    );
  }
};

export const LoginOrDisplayUser = () => {
  const identityToken = getIdentityTokenFromStorageAndCleanUrl();

  const disconnect = useCallback(() => {
    localStorage.removeItem(IDENTITY_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.location.href = "/";
  }, []);

  if (identityToken) {
    const decodedToken =
      decodeJWT<{ name: string; picture: string }, any>(identityToken);
    const name = decodedToken.payload.name;
    const pictureUrl = decodedToken.payload.picture;
    return <NavUser name={name} src={pictureUrl} onClick={disconnect} />;
  }

  return <NavUser name="Login" onClick={authenticateWithWebAuthn} />;
  // return <NavUser name="Login" onClick={registerNewWebAuthnCredential} />;
};
