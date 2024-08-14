import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        author
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($author: String!, $email: String!, $password: String!) {
    addUser(author: $author, email: $email, password: $password) {
      token
      user {
        _id
        author
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addArticle($thoughtText: String!) {
    addArticle(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      publishedAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      publishedAt
      comments {
        _id
        commentText
        publishedAt
      }
    }
  }
`;