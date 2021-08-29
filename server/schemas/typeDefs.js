const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    userName: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Book {
    authors: [String]
    description: String
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    me: User
  }

  type Auth {
    token: ID
    user: User
  }

  `;
  
  module.exports = typeDefs;
  
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    // saveBook(authors: String, description: String!, bookId: String!, image: String, link: String, title: String!): User
    // removeBook(_id: user.id, _id:book.id): User
  }