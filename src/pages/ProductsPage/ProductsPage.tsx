import { ModalProduct } from "../../components/global/ModalAddItem";
import { ProductsList } from "./components/ProductsList";
import { ProductsMutate } from "./components/ProductsMutate";
import { dispatchProductVar } from './components/productVar'

export const ProductsPage = () => {
  return (
    <div>
      <button onClick={() => 
          dispatchProductVar({
            _id: "",  
            name: "",  
            type: "create",  
            subcategory: "",
            category: "",
            suplier: "",
            edit: 'Product', 
            openModal: true
        })}>Create Product</button>
      <ProductsList />
      <ModalProduct children={<ProductsMutate />} />
    </div>
  );
};
