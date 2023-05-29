import { gql } from "@apollo/client";

export const CATEGORIES = gql`
  query Users($userId: ID!) {
    categories(userId: $userId) {
      _id
      name
      subcategory
      categoryTest @client
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation CreateCategory($categoryInput: CategoryInput) {
    createCategory(categoryInput: $categoryInput) {
      _id
      name
      subcategory
      userId
    }
  }
`

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($categoryEdit: CategoryEdit) {
    updateCategory(categoryEdit: $categoryEdit) {
      _id
      name
      subcategory
      userId
    }
  }
`

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($categoryEdit: CategoryEdit) {
    deleteCategory(categoryEdit: $categoryEdit) {
      _id
      name
      subcategory
      userId
    }
  }
`