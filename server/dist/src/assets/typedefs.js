"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { gql } = require('apollo-server');
const typeDefs = gql `
  type Location{
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
    name: String
    price: Float
    image: String
  }

  type Query {
    events: [Event],
    products: [Product]
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typedefs.js.map