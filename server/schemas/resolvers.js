const { User, Article } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('articles');
    },
    user: async (parent, { author }) => {
      return User.findOne({ author }).populate('articles');
    },
    articles: async (parent, { author }) => {
      const params = author ? { author } : {};
      return Article.find(params).sort({ publishedAt: -1 });
    },
    article: async (parent, { articleId }) => {
      return Article.findOne({ _id: articleId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('articles');
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
    addArticle: async (parent, { articleText }, context) => {
      if (context.user) {
        const article = await Article.create({
          articleText,
          articleAuthor: context.user.author,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { articles: article._id } }
        );

        return article;
      }
      throw AuthenticationError;
    },
    addComment: async (parent, { articleId, commentText }, context) => {
      if (context.user) {
        return Article.findOneAndUpdate(
          { _id: articleId },
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
    removeArticle: async (parent, { articleId }, context) => {
      if (context.user) {
        const article = await Article.findOneAndDelete({
          _id: articleId,
          articleAuthor: context.user.author,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { articles: article._id } }
        );

        return article;
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { articleId, commentId }, context) => {
      if (context.user) {
        return Article.findOneAndUpdate(
          { _id: articleId },
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