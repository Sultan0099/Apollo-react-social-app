import gql from "graphql-tag";

export const FETCH_POST_CLIENT = gql`
  query {
    fetchPosts @client {
      id
      username
      body
      createdAt
      user {
        id
        username
        email
        name
      }
      likes {
        id
        likedBy
        likedAt
      }
      comments {
        id
        body
        commentBy
        commentAt
      }
    }
  }
`;

export const SET_POST_CLIENT = gql`
  query {
    setPosts @client {
      id
      username
      body
      createdAt
      user {
        id
        username
        email
        name
      }
      likes {
        id
        likedBy
        likedAt
      }
      comments {
        id
        body
        commentBy
        commentAt
      }
    }
  }
`;
