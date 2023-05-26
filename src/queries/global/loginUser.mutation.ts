import { gql } from "@apollo/client";

export const LOGIN = gql`
mutation LoginUser($loginInput: LoginInput) {
  loginUser(loginInput: $loginInput) {
    name
    email
    token
  }
}
`;