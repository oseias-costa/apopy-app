import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://apopy-api.onrender.com/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          category: {
            read: (existing, { toReference, args }) => {
              const categoryRef = toReference({ __typename: "Category", _id: args._id})
              return existing ?? categoryRef
            }
          }
        }
      },
      Category: {
        keyFields: ['_id'],
        fields: {
          categoryTest: {
            read: (_, { readField }) => {
              const name = readField('name')
              const _id = readField('_id')

              return `${name} ${_id}`
            }
          }
        }
      }
    }
  }),
});

console.log(client)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
  </React.StrictMode>
);
