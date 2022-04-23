import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Honeybadger from "@honeybadger-io/js";
import { HoneybadgerErrorBoundary } from "@honeybadger-io/react";

Honeybadger.configure({
  apiKey: import.meta.env.VITE_HONEYBADGER_API_KEY as string,
  environment: import.meta.env.MODE,
});

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
