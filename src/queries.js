import { gql } from "@apollo/client";

export const GET_BOOKS = gql`query ExampleQuery {
  books {
    author
    title
    readingLevel
  }
}
`