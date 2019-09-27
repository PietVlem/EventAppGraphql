import { ApolloServer } from 'apollo-server';
import typeDefs from './assets/typedefs';
import resolvers from './assets/resolvers';

/* FACEBOOK OAUTH */
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';

const server = new ApolloServer(
    {
        typeDefs,
        resolvers,
        /*
        context: ({ req }) => {
            // get the user token from the headers
            const token = req.headers.authorization || '';
           
            // try to retrieve a user with the token
            const user = getUser(token);
           
            // optionally block the user
            // we could also check user roles/permissions here
            if (!user) throw new AuthenticationError('you must be logged in'); 
           
            // add the user to the context
            return { user };
           },
        */
    }
);

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
