import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($author: String!) {
    user(author: $author) {
      _id
      author
      email
      articles {
        _id
        title
        content
        publishedAt
        url
      }
    }
  }
`;

export const QUERY_ARTICLES = gql`
  query fetchArticles {
    fetchArticles {
      _id
      title
      content
      author
      publishedAt
      url
    }
  }
`;

export const QUERY_SINGLE_ARTICLE = gql`
  query getSingleArticle($articleId: ID!) {
    article(articleId: $articleId) {
      _id
      title
      content
      author
      publishedAt
      url
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
        title
        content
        author
        publishedAt
        url
      }
    }
  }
`;