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

export const ADD_ARTICLE = gql`
  mutation addArticle($content: String!) {
    addArticle(content: $content) {
      _id
      title
      content
      author
      publishedAt
    }
  }
`;