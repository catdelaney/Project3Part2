// Imports
const { Schema, model } = require("mongoose");
// const commentSchema = require("./Comment");

// Article schema
const articleSchema = new Schema(
  {
    content: {
      type: String,
      required: false,
      maxlength: 10000,
      minlength: 0,
    },
    title: {
        type: String,
        required: true,
        maxlength: 1000,
        minlength: 1,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Article = model("article", articleSchema);

module.exports = Article;