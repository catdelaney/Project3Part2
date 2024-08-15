const { User, Article } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const fetch = require('node-fetch');
require('dotenv').config();

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username });
    },

    articles: async (parent, { articleTitle }) => {
      const articles = await Article.find({ title: articleTitle });
      if (articles.length === 0) {
        try {
          const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=3713575862d34444afaac73100b88980`);
          if (!response.ok) {
            throw new Error('Failed to fetch articles');
          }

          const { articles: apiArticles } = await response.json();
          if (apiArticles.length > 0) {
            const fetchedArticles = await Promise.all(apiArticles.map(async (apiArticle) => {
            return await Article.create({
              title: apiArticle.title,
              author: apiArticle.author,
              publishedAt: apiArticle.publishedAt,
              content: apiArticle.content || '',
            });
          }));
          return fetchedArticles;
          } else {
            throw new Error('No articles found');
          }
        } catch (error) {
          console.error('Error fetching articles:', error);
          throw new Error('Failed to fetch articles');
        }
      }
       return articles;
      },

    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError();
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError();
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError();
      }

      const token = signToken(user);

      return { token, user };
    },
    addArticle: async (parent, { title, author, publishedAt, content }) => {
      const newArticle = new Article({ 
        title,
        author,
        publishedAt,
        content: content || ''
      });
      return await newArticle.save();
    },
  },
};

module.exports = resolvers;
