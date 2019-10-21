import { ApolloError } from 'apollo-server';
import services from './services';

export default {
    Query: {
        events: () => services.getEvents(),
        locations: () => services.getLocations(),
        products: () => services.getProducts(),
        posts: () => services.getPosts(),
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
        deleteProduct: (parent, id) => services.deleteProduct(parent, id),
        createEvent: (parent, {input}) => services.createEvent(parent, {input}),
        deleteEvent: (parent, id) => services.deleteEvent(parent, id),
        createLocation: (parent, {input}) => services.createLocation(parent, {input}),
        deleteLocation: (parent, id) => services.deleteLocation(parent, id),
        createPost: (parent, {input}) => services.createPost(parent, {input}),
        deletePost: (parent, id) => services.deletePost(parent, id),
    }
};