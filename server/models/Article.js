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
    // comments: [commentSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Increases comment count in Article model object when comments are added to an article
// articleSchema.virtual("commentCount").get(function () {
//   return this.comments.length;
// });

// Creates Article model with articleSchema
const Article = model("article", articleSchema);

// Exports
module.exports = Article;