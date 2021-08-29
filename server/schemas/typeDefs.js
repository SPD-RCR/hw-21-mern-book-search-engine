const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    userName: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Book {
    _id: ID!
    authors: String
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    users: [User]
    user(_id: String): User
    books: [Book]
    book(_id: String): Book
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }

  `;
  
  module.exports = typeDefs;
  
  // type Mutation {
  //   addUser(username: String!, email: String!, password: String!): Auth
  //   login(email: String!, password: String!): Auth
  //   saveBook(_id: book.id, authors: String, description: String!, bookId: String!, image: String, link: String, title: String!): User
  //   removeBook(_id: user.id, _id:book.id): User
  // }