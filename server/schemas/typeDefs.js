const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    userName: String!
    email: String!
    savedBooks: [Book]
  }

  type Book {
    authors: [String]
    description: String
    bookId: ID!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input SavedBookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    me: User
  }

  type mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(savedBooks: SavedBookInput): User
    removeBook(bookId: ID!): User
  }
  `;
  
  module.exports = typeDefs;
  