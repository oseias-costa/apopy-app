import { gql } from "@apollo/client";


export const CREATE_SUBCATEGORY = gql`
    mutation CreateSubcategory($subcategoryInput: SubcategoryInput) {
        createSubcategory(subcategoryInput: $subcategoryInput) {
            name
  }
}
`

export const UPDATE_SUBCATEGORY = gql`
    mutation Mutation($subcategoryEdit: SubcategoryEdit) {
        updateSubcategory(subcategoryEdit: $subcategoryEdit) {
            name
  }
}
`