const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const articleSchema = new Schema({
  content: {
    type: String,
    required: 'You need to leave a article!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      publishedAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Article = model('Article', articleSchema);

module.exports = Article;
