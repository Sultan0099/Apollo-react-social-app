import gql from "graphql-tag";

export const FETCH_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      username
      email
      name
      posts {
        id
      }
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
