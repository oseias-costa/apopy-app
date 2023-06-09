import { useQuery } from "@apollo/client";
import { PRODUCTS } from "../../../queries/products";
import { dispatchProductVar } from "./productVar";

export const ProductsList = () => {
  const { data } = useQuery(PRODUCTS);
  console.log('products', data)
  const products = data?.products.map((item) => {
    return (
      <div key={item.id} style={{ display: "flex" }}>
        <p>{item.category}</p>
        <p>{item.subcategory}</p>
        <p>{item.suplier}</p>
        <p>{item.name}</p>
        <button onClick={() => dispatchProductVar({
           _id: item._id,  
           name: item.name,
           suplier: item.suplier,
           subcategory: item.subcategory,
           category: item.category,  
           type: "update",  
           edit: 'products', 
           openModal: true
        })}>Editar</button>
        <button  onClick={() => dispatchProductVar({
           _id: item._id,  
           name: item.name,
           suplier: item.suplier,
           subcategory: item.subcategory,
           category: item.category,  
           type: "delete",  
           edit: 'products', 
           openModal: true
        })}>Excluir</button>
      </div>
    ); 
  });
  return <div>{products}</div>;
};
