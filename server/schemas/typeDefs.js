const typeDefs = `
  type User {
    _id: ID
    author: String
    email: String
    password: String
    thoughts: [Article]!
  }

  type Article {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    publishedAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    publishedAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(author: String!): User
    thoughts(author: String): [Article]
    thought(thoughtId: ID!): Article
    me: User
  }

  type Mutation {
    addUser(author: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addArticle(thoughtText: String!): Article
    addComment(thoughtId: ID!, commentText: String!): Article
    removeArticle(thoughtId: ID!): Article
    removeComment(thoughtId: ID!, commentId: ID!): Article
  }
`;

module.exports = typeDefs;