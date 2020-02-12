import gql from "graphql-tag";

export const USER_LOGIN = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      username
      token
    }
  }
`;

export const USER_REGISTER = gql`
  mutation(
    $email: String!
    $name: String!
    $username: String!
    $password: String!
  ) {
    register(
      email: $email
      name: $name
      username: $username
      password: $password
    ) {
      id
      username
      token
    }
  }
`;
