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
    name: String
    date: String
    start: String
    end: String
    facebook: String
    details: String
    location: Location
    #image: String
  }

  type Drink {
    name: String
    price: Float
  }

  type Query {
    events: [Event]
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typedefs.js.map