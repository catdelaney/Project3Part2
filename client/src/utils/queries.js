import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($author: String!) {
    user(author: $author) {
      _id
      author
      email
      articles {
        _id
        articleText
        publishedAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getArticles {
    articles {
      _id
      articleText
      articleAuthor
      publishedAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleArticle($articleId: ID!) {
    article(articleId: $articleId) {
      _id
      articleText
      articleAuthor
      publishedAt
      comments {
        _id
        commentText
        commentAuthor
        publishedAt
      }
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
        articleText
        articleAuthor
        publishedAt
      }
    }
  }
`;