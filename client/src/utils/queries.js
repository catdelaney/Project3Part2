import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($author: String!) {
    user(author: $author) {
      _id
      author
      email
      articles {
        _id
        content
        publishedAt
      }
    }
  }
`;

export const QUERY_ARTICLES = gql`
  query getArticles {
    articles {
      _id
      content
      author
      publishedAt
    }
  }
`;

export const QUERY_SINGLE_ARTICLE = gql`
  query getSingleArticle($articleId: ID!) {
    article(articleId: $articleId) {
      _id
      content
      author
      publishedAt
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      author
      email
      articles {
        _id
        content
        author
        publishedAt
      }
    }
  }
`;