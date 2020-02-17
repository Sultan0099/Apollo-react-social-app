import gql from "graphql-tag";

export const USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      username
    }
  }
`;

export const FETCH_PAGINATED_POST = gql`
  query paginatedPosts($page: Int!, $postLength: Int!) {
    paginatedPost(page: $page, postLength: $postLength) {
      posts {
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
        }
        comments {
          id
        }
      }
      hasMore
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
