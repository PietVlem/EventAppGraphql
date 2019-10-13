"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { gql } = require('apollo-server');
const typeDefs = gql `
  type Location{
    id: ID
    name: String
    address: String
    city: String
    zipcode: String
    country: String
  }

  type Event {
    id: String
    name: String
    date: String
    start: String
    end: String
    facebook: String
    details: String
    location: Location
    image: String
  }

  type Product {
    id: ID
    name: String
    price: Float
    image: String
  }

  type Query {
    events: [Event],
    locations: [Location],
    products: [Product]
  }

  input ProductInput{
    name: String
    price: Float
    image: String
  }

  input EventInput{
    name: String
    date: String
    start: String
    end: String
    facebook: String
    details: String
    locationId: String
    image: String
  }

  input LocationInput{
    name: String
    address: String
    city: String
    zipcode: String
    country: String
  }

  type Mutation {
    createProduct(input: ProductInput!): Product,
    deleteProduct(id: String!): String,
    createEvent(input: EventInput!): Event,
    deleteEvent(id: String!): String,
    createLocation(input: LocationInput!): Location,
    deleteLocation(id: String!): String
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typedefs.js.map