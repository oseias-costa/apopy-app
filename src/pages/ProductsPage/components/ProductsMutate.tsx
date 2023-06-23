import { useState } from "react";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../../../queries/products";
import { dispatchProductVar, initialValue } from "./productVar";
import { ProductForm } from "./ProductForm";
import { client } from "../../../main";

export const ProductsMutate = () => {
  const [createProduct] = useMutation(CREATE_PRODUCT, {
    update: (cache, { data }) => {
      const cacheId: string | any = cache.identify(data.createProduct);
      cache.modify({
        fields: {
          products: (existingFieldData, { toReference }) => {
            return [...existingFieldData, toReference(cacheId)];
          },
        },
      });
    },
  });

  const [ updateProduct ] = useMutation(UPDATE_PRODUCT, {
    update: (cache, { data: { updateProduct } }) => {
      client.readFragment({
        id: `Product:${updateProduct._id}`,
        fragment: gql`
          fragment MyProduct on Product {
            _id
            name
            category
            subcategory
            suplier
          }
        `,
      });
    },
  })

  const [ deleteProduct ] = useMutation(DELETE_PRODUCT, {
    update: (cache, { data: { deleteProduct } }) => {
      const normalizedId = cache.identify({
        _id: deleteProduct._id,
        __typename: "Product",
      });
      cache.evict({ id: normalizedId });
    },
  });

  const stateProduct = useReactiveVar(dispatchProductVar);

  const handleMutateProduct = () => {
    if (stateProduct.type === "create") {
      createProduct({
        variables: {
          productInput: {
            name: stateProduct.name,
            category: stateProduct.category,
            subcategory: stateProduct.subcategory,
            suplier: stateProduct.suplier,
            userId: "6451a787de4c08d54ed8da35",
          },
        },
      });
      dispatchProductVar(initialValue)
    }  else if(stateProduct.type === 'update') {
      updateProduct({
        variables: {
          productEdit: {
            _id: stateProduct._id,
            name: stateProduct.name,
            category: stateProduct.category,
            subcategory: stateProduct.subcategory,
            suplier: stateProduct.suplier
          }
        }
      })
      dispatchProductVar(initialValue)
    } else {
      deleteProduct({
        variables:{
          _id: stateProduct._id
        }
      })
      dispatchProductVar(initialValue)
    }
  };
  return (
    <div>
      <h2>{stateProduct.edit}</h2>
      <ProductForm />
      <input
        type="text"
        onChange={(e) =>
          dispatchProductVar({
            ...stateProduct,
            name: e.target.value,
          })
        }
        value={ stateProduct.name !== '' ? stateProduct.name : ''}
      />
      <button onClick={() => handleMutateProduct()}>{stateProduct.type}</button>
      <button onClick={() => dispatchProductVar(initialValue)}>Desfazer</button>
    </div>
  );
};
