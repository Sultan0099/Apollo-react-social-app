import gql from "graphql-tag";

export const USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      username
    }
  }
`;

export const FETCH_ALL_POST = gql`
  query posts {
    posts {
      id
      username
      body
      comments {
        id
        commentAt
        commentBy
        commentAt
        body
      }
      likes {
        id
        likedBy
        likedAt
      }
    }
  }
`;
