import { ApolloError } from 'apollo-server';
import services from './services';
import DateTime from './scalars/dateTime';

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
        createProduct: (_, {input}) => services.createProduct({input}),
        deleteProduct: (_, id) => services.deleteProduct(id),
        createEvent: (_, {input}) => services.createEvent({input}),
        deleteEvent: (_, id) => services.deleteEvent(id),
        createLocation: (_, {input}, {pubsub}) => services.createLocation({input}, {pubsub}),
        deleteLocation: (_, id, {pubsub}) => services.deleteLocation(id , {pubsub}),
        createPost: (_, {input}, {pubsub}) => services.createPost({input}, {pubsub}),
        deletePost: (_, id , {pubsub}) => services.deletePost(id, { pubsub }),
    },
    Subscription: {
        newPost:{
            subscribe: (_, __, {pubsub}) => pubsub.asyncIterator('NEW_POST'),
        },
        deletePost:{
            subscribe: (_, __, {pubsub}) => pubsub.asyncIterator('DELETE_POST'),
        },
        newLocation: {
            subscribe: (_, __, {pubsub}) => pubsub.asyncIterator('NEW_LOCATION'),
        },
        deleteLocation: {
            subscribe: (_, __, {pubsub}) => pubsub.asyncIterator('DELETE_LOCATION'),
        }
    },
    DateTime: DateTime
};