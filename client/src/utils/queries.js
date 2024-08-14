import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($author: String!) {
    user(author: $author) {
      _id
      author
      email
      thoughts {
        _id
        thoughtText
        publishedAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getArticles {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      publishedAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleArticle($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
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
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        publishedAt
      }
    }
  }
`;