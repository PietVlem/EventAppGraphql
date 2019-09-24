import { ApolloServer } from 'apollo-server';
import typeDefs from './assets/typedefs';
import resolvers from './assets/resolvers';

/* FACEBOOK OAUTH */
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
