import { gql } from "@apollo/client";

export const CATEGORIES = gql`
  query Users($userId: ID!) {
    categories(userId: $userId) {
      _id
      name
      subcategory
    }
  }
`;
