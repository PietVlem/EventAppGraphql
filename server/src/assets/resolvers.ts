import { ApolloError } from 'apollo-server';
import services from './services';

export default {
    Query: {
        events: () => services.getEvents(),
        products: () => services.getProducts(),
    },
    Event: {
        async location(event) {
            try {
                const location = services.getEventLocation(event.locationId);
                return location;
            } catch (error) {
                throw new ApolloError(error);
            }
        }
    },
    Mutation: {
        createProduct: (parent, {input}) => services.createProduct(parent, {input}),
        createTest: (parent, name) => services.createTest(parent, name),
    }
};