import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks: allBooks(genre: $genre) {
      title
      author {
        id
        name
      }
      published
      id
      genres
    }
    genres: allBooks {
      genres
    }
  }
`;

export const RECOMMENDED_BOOKS = gql`
  query recommendedBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        id
        name
      }
      published
      id
      genres
    }
  }
`;

export const ADD_BOOK = gql`
  mutation newBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      id
      genres
    }
  }
`;

export const ADD_YEAR = gql`
  mutation addYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
      bookCount
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const FAVOURITE_GENRE = gql`
  query {
    me {
      favouriteGenre
    }
  }
`;
