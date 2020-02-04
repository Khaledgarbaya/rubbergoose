import React from "react"
import netlifyIdentity from "netlify-identity-widget"
import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloClient } from "apollo-client"
// Setup the network "links"
import { WebSocketLink } from "apollo-link-ws"
import { HttpLink } from "apollo-link-http"
import { split } from "apollo-link"
import { getMainDefinition } from "apollo-utilities"
import { InMemoryCache } from "apollo-cache-inmemory"

const cache = new InMemoryCache()

const httpLink = new HttpLink({
  uri: "http://rubbergoose.herokuapp.com/v1/graphql",
  headers: {
    "x-hasura-admin-secret": `${process.env.HASURA_SECRET}`,
  },
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: "ws://rubbergoose.herokuapp.com/v1/graphql", // use wss for a secure endpoint

  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": `${process.env.HASURA_SECRET}`,
      },
    },
  },
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === "OperationDefinition" && operation === "subscription"
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache,
})
window.netlifyIdentity = netlifyIdentity
// You must run this once before trying to interact with the widget
netlifyIdentity.init()

export const wrapRootElement = ({ element }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
