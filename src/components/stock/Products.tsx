import { useQuery } from '@apollo/client'
import { PRODUCTS } from '../../queries/products'
import { ProductsData } from '../../types/stock/products.type'

export const Products = () => {
    const { data, loading } = useQuery(PRODUCTS)
    const listProducts = data?.products.map(
        (item: ProductsData) => <p key={item._id}>{item.name}</p>)

    return(
        <div>
            {!loading && listProducts}
        </div>
    )
}