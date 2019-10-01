const { gql } = require('apollo-server');

const typeDefs = gql`
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
    id: ID
    name: String
    price: Float
    image: String
  }

  type Query {
    events: [Event],
    products: [Product]
  }

  input ProductInput{
    name: String
    price: Float
    image: String
  }

  type Mutation {
    createProduct(input: ProductInput!): Product,
    deleteProduct(id: String!): String,
  }
`;

export default typeDefs;