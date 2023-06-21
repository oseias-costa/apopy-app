import { gql } from '@apollo/client'

export const PRODUCTS = gql`
    query Products {
        products {
            _id
            category
            subcategory
            name
            suplier
            userId
    }
}
`

export const CREATE_PRODUCT = gql`
    mutation Mutation($productInput: ProductInput) {
        createProduct(productInput: $productInput) {
            _id
            category
            name
            subcategory
            suplier
            userId
        }
    }
`

export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($productEdit: ProductEdit) {
        updateProduct(productEdit: $productEdit) {
            _id
            name
            category
            subcategory
            suplier
        } 
    }
`