import gql from "graphql-tag";

export const USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      username
    }
  }
`;
