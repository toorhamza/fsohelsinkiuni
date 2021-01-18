import { gql } from '@apollo/client';

export const ALL_AUTHOR = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks { 
    title 
    author
    published 
  }
}
`

export const ADD_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author
  }
}
`

export const UPDATE_YEAR = gql`
mutation updateYear($name: String!, $year: Int!) {
  editAuthor(name: $name, setBornTo: $year) {
    name
    born
  }
}
`

