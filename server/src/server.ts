import { ApolloServer, PubSub } from 'apollo-server';
import typeDefs from './assets/typedefs';
import resolvers from './assets/resolvers';

/* FACEBOOK OAUTH */
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';

const pubsub = new PubSub();

const server = new ApolloServer(
    {
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({ req, res, pubsub })
    }
);

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`);
    console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
