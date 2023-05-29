import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      name
      email
      password
      phone
      token
    }
  }
`;
