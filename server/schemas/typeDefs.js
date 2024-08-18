const typeDefs = `
  type User {
    _id: ID
    author: String
    email: String
    password: String
    articles: [Article]!
  }

  type Article {
    _id: ID
    title: String!
    content: String!
    author: String
    publishedAt: String
    url: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(author: String!): User
    fetchArticles: [Article]
    article(articleId: ID!): Article
    me: User
  }

  type Mutation {
    addUser(author: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addArticle(title: String!, content: String!, author: String, publishedAt: String): Article
    removeArticle(articleId: ID!): Article
  }
`;

module.exports = typeDefs;