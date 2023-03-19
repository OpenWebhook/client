import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import { ACCESS_TOKEN_KEY, IDENTITY_TOKEN_KEY } from "./local-storage";

export const createApolloClient = (httpUrl: string) => {
  const origin = new URL(httpUrl).origin;
  const graphqlUrl = `${origin}/graphql`;
  const wsUrl = graphqlUrl.replace("http", "ws");

  const httpLink = new HttpLink({
    uri: graphqlUrl,
  });

  const authLink = setContext(async (_, { headers }) => {
    var accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!accessToken) {
      const identityToken = localStorage.getItem(IDENTITY_TOKEN_KEY);
      if (identityToken) {
        accessToken = await getAccessToken(identityToken, httpUrl);
      }
    }
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: wsUrl,
      connectionParams: {
        authToken: localStorage.getItem(ACCESS_TOKEN_KEY),
      },
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    authLink.concat(httpLink)
  );

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

const getAccessToken = async (
  identityToken: string,
  webhookStoreUrl: string
): Promise<string> => {
  const webhookStoreHostname = new URL(webhookStoreUrl).hostname;
  const accessTokenRequest = await fetch(
    `${import.meta.env.VITE_AUTH_TENANT_URL}/webhook-store-auth/access-token`,
    {
      headers: {
        Authorization: `Bearer ${identityToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        webhookStoreUrl: webhookStoreHostname,
      }),
    }
  );
  const json = await accessTokenRequest.json();
  const accessToken = json.accessToken;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

  return accessToken;
};
