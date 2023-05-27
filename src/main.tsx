import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const client = new ApolloClient({
  uri: "https://apopy-api.onrender.com/graphql",
  cache: new InMemoryCache(),
});

const store = configureStore({
  reducer: {},
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
