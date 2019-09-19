import { ApolloServer } from 'apollo-server';
import typeDefs from './assets/typedefs';
import resolvers from './assets/resolvers';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
