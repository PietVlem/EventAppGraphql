"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typedefs_1 = __importDefault(require("./assets/typedefs"));
const resolvers_1 = __importDefault(require("./assets/resolvers"));
const pubsub = new apollo_server_1.PubSub();
const server = new apollo_server_1.ApolloServer({
    typeDefs: typedefs_1.default,
    resolvers: resolvers_1.default,
    context: ({ req, res }) => ({ req, res, pubsub })
});
server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`);
    console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
//# sourceMappingURL=server.js.map