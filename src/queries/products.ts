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