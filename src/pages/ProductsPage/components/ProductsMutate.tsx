import { useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import { CREATE_PRODUCT } from "../../../queries/products";
import { dispatchProductVar, initialValue } from "./productVar";
import { ProductForm } from "./ProductForm";

export const ProductsMutate = () => {
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const stateProduct = useReactiveVar(dispatchProductVar);
  const [itemSelected, setItemSelected] = useState({
    category: "",
    subcategory: "",
    suplier: "",
    product: "",
    newProduct: "",
  });

  console.log(itemSelected);

  const handleMutateProduct = () => {
    if (stateProduct.type === "create") {
      createProduct({
        variables: {
          productInput: {
            name: "",
            category: "",
            subcategory: "",
            suplier: "",
            userId: "6451a787de4c08d54ed8da35",
          },
        },
      });
    }
  };
  return (
    <div>
      <h2>{stateProduct.edit}</h2>
      <ProductForm
        itemSelected={itemSelected}
        setItemSelected={setItemSelected}
      />
      <input type="text" />
      <button onClick={() => handleMutateProduct()}>Create</button>
      <button onClick={() => dispatchProductVar(initialValue)}>Desfazer</button>
    </div>
  );
};
