import { SubscriptionClient } from 'subscriptions-transport-ws';

import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

const wsClient = new SubscriptionClient(`ws://localhost:4000/subscriptions`, {
    reconnect: true,
    connectionParams: {
    }
});

const link = new WebSocketLink(wsClient);

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
});

export default client;