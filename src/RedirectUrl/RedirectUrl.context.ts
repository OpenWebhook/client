import React from "react";

export const RedirectUrlContext = React.createContext({
  value: "http://localhost:8010/proxy",
  setValue: (_newValue: string) => {
    return;
  },
});
