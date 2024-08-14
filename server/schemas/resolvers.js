const { User, Article } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (parent, { author }) => {
      return User.findOne({ author }).populate('thoughts');
    },
    thoughts: async (parent, { author }) => {
      const params = author ? { author } : {};
      return Article.find(params).sort({ publishedAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Article.findOne({ _id: thoughtId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { author, email, password }) => {
      const user = await User.create({ author, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addArticle: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Article.create({
          thoughtText,
          thoughtAuthor: context.user.author,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw AuthenticationError;
    },
    addComment: async (parent, { thoughtId, commentText }, context) => {
      if (context.user) {
        return Article.findOneAndUpdate(
          { _id: thoughtId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.author },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeArticle: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Article.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.author,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );

        return thought;
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { thoughtId, commentId }, context) => {
      if (context.user) {
        return Article.findOneAndUpdate(
          { _id: thoughtId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.author,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;