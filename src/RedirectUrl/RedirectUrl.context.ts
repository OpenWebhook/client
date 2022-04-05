import React from "react";

export const RedirectUrlContext = React.createContext({
  value: "http://localhost:9001",
  setValue: (_newValue: string) => {
    return;
  },
});
