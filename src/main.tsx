import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Honeybadger from "@honeybadger-io/js";
import { HoneybadgerErrorBoundary } from "@honeybadger-io/react";
import posthog from "posthog-js";
import { ENVIRONMENT_KEY } from "./local-storage";

const autoRedirectOnGithubAuth =
  window.location.hostname === "github.webhook.store";
if (autoRedirectOnGithubAuth) {
  window.location.href = `${import.meta.env.VITE_AUTH_TENANT_URL}/oauth/login`;
}

Honeybadger.configure({
  apiKey: import.meta.env.VITE_HONEYBADGER_API_KEY as string,
  environment: import.meta.env.MODE,
});

posthog.init(import.meta.env.VITE_POSTHOG_API_KEY as string, {
  api_host: "https://app.posthog.com",
});

const initEnvInLocalStorage = () => {
  const env = localStorage.getItem(ENVIRONMENT_KEY);
  if (!env) {
    if (window.location.origin.startsWith("http://localhost:")) {
      localStorage.setItem(ENVIRONMENT_KEY, "development");
    } else {
      localStorage.setItem(ENVIRONMENT_KEY, "production");
    }
  }
};

initEnvInLocalStorage();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <HoneybadgerErrorBoundary honeybadger={Honeybadger}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HoneybadgerErrorBoundary>
);
