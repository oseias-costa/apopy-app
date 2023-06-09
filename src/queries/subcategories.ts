import { gql } from "@apollo/client";


export const CREATE_SUBCATEGORY = gql`
    mutation CreateSubcategory($subcategoryInput: SubcategoryInput) {
        createSubcategory(subcategoryInput: $subcategoryInput) {
            name
            _id
            subcategory
        }
    }
`

export const UPDATE_SUBCATEGORY = gql`
    mutation Mutation($subcategoryEdit: SubcategoryEdit) {
        updateSubcategory(subcategoryEdit: $subcategoryEdit) {
            name
            _id
            subcategory
        }
    }
`

export const DELETE_SUBCATEGORY = gql`
    mutation DeleteSubcategory($subcategoryEdit: SubcategoryEdit) {
        deleteSubcategory(subcategoryEdit: $subcategoryEdit) {
            name
            _id
            subcategory
        }
    }   
`