const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ username: context.username }).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  // Mutation: {
  //   addUser(username: String!, email: String!, password: String!): Auth
  // }
  // users: async () => {
  //   return User.find({});
  // },
  // user: async (parent, { user }) => {
  //   return User.findOne({ _id: context.user._id }).populate('books');
  // },
  // books: async (parent, { user }) => {
  //   const params = user ? context.user.id : {};
  //   return Book.find(params).sort({ createdAt: -1 });
  // },
  // book: async (parent, { book }) => {
  //   return Book.findOne({ _id: context.book._id });
  // },
  // Mutation: {
  //   addUser: async (parent, { username, email, password }) => {
  //     const user = await User.create({ username, email, password });
  //     const token = signToken(user);
  //     return { token, user };
  //   },
  //   login: async (parent, { email, password }) => {
  //     const user = await User.findOne({ email });

  //     if (!user) {
  //       throw new AuthenticationError('No user found with this email address');
  //     }

  //     const correctPw = await user.isCorrectPassword(password);

  //     if (!correctPw) {
  //       throw new AuthenticationError('Incorrect credentials');
  //     }

  //     const token = signToken(user);

  //     return { token, user };
  //   },
  //   addBook: async (parent, { _id, authors, description, bookId, image, link, title }, context) => {
  //     if (context.user) {
  //       const book = await Book.create({
  //         _id,
  //         authors, 
  //         description, 
  //         bookId, 
  //         image, 
  //         link, 
  //         title,
  //         user: context.user
  //       });

  //       await User.findOneAndUpdate(
  //         { _id: context.user.id },
  //         { $addToSet: { savedBooks: book.id } }
  //       );

  //       return book;
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   },
  //   removeUser: async (parent, { user }, context) => {
  //     if (context.user) {
  //       const user = await User.findOneAndDelete({
  //         user: user.id
  //       });

  //       await User.findOneAndUpdate(
  //         { _id: context.user._id },
  //         { $pull: { thoughts: thought._id } }
  //       );

  //       return user;
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   },
  //   removeBook: async (parent, { book }, context) => {
  //     if (context.user) {
  //       const book = await Book.findOneAndDelete({
  //         _id: book.id,
  //         savedBooks: context.user.id,
  //       });

  //       await User.findOneAndUpdate(
  //         { _id: context.user._id },
  //         { $pull: { savedBooks: book._id } }
  //       );

  //       return book;
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   }
  // },
};

module.exports = resolvers;
