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