import { ApolloServer, PubSub } from 'apollo-server';
import typeDefs from './assets/typedefs';
import resolvers from './assets/resolvers';

const PORT = 4000;
const pubsub = new PubSub();
const context = ({ req, res }) => ({req, res, pubsub})

const server = new ApolloServer({ typeDefs, resolvers, context });

server.listen({ port: PORT }).then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`);
    console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});