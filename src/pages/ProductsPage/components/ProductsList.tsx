import React from "react";
import { useQuery } from "@apollo/client";
import { PRODUCTS } from "../../../queries/products";

export const ProductsList = () => {
  const { data } = useQuery(PRODUCTS);
  const products = data?.products.map((item) => {
    return (
      <div key={item.id} style={{ display: "flex" }}>
        <p>{item.category}</p>
        <p>{item.subcategory}</p>
        <p>{item.suplier}</p>
        <p>{item.name}</p>
        <button>Editar</button>
        <button>Excluir</button>
      </div>
    );
  });
  return <div>{products}</div>;
};
