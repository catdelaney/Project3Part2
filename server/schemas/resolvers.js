const { User, Article } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const fetch = require('node-fetch');
require('dotenv').config();

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (parent, { author }) => {
      return await User.findOne({ author });
    },

    fetchArticles: async () => {
      const articles = await Article.find().limit(25);
      if (articles.length === 0) {
        try {
          const response = await fetch(`https://newsapi.org/v2/everything?q=business&apiKey=3713575862d34444afaac73100b88980`);
          if (!response.ok) {
            throw new Error('Failed to fetch articles');
          }

          const { articles: apiArticles } = await response.json();
          if (apiArticles.length > 0) {
            const fetchedArticles = await Promise.all(apiArticles.map(async (apiArticle) => {
            const newArticle = new Article({
              title: apiArticle.title,
              author: apiArticle.author,
              publishedAt: apiArticle.publishedAt,
              content: apiArticle.content || '',
              url: apiArticle.url,
            });
            
            const savedArticle = await newArticle.save();
            console.log('Article saved:', savedArticle);
            return savedArticle;
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
    addUser: async (parent, { author, email, password }) => {
      const user = await User.create({ author, email, password });
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
    addArticle: async (parent, { title, content, author, publishedAt }) => {
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
