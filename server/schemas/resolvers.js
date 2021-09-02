const { AuthenticationError, attachConnectorsToContext } = require('apollo-server-express');
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
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    
    saveBook: async (parent, { savedBooks }, context) => {
      if (context.user) {
        const updateUser = await User.findByIdAndUpdate( 
          { _id: context.user.id },
          { $push: { savedBooks: savedBooks } }, 
          { 
            new: true,
            runValidators: true
          }
        );

        return updateUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updateUser = await User.findByIdAndUpdate( 
          { _id: context.user.id },
          { $pull: { bookId } }, 
          { 
            new: true,
            runValidators: true
          }
        );

        return updateUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;
      
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
  // }