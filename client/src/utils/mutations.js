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
  mutation addArticle($title: String!, $content: String!, $author: String, $publishedAt: String, $url: String) {
    addArticle(title: $title, content: $content, author: $author, publishedAt: $publishedAt, url: $url) {
      _id
      title
      content
      author
      publishedAt
      url
    }
  }
`;

export const FAVORITE_ARTICLE = gql`
  mutation favoriteArticle($articleId: ID!) {
    favoriteArticle(articleId: $articleId) {
      _id
      favorites {
        _id
        title
        author
        content
        url
      }
    }
  }
`;