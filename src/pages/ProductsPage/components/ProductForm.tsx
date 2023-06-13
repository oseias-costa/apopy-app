import { useState } from "react";
import { useQuery } from "@apollo/client";
import { CATEGORIES } from "../../../queries/categories";
import { SUPLIERS } from "../../../queries/supliers";

export const ProductForm = ({itemSelected, setItemSelected}) => {

  const { data } = useQuery(CATEGORIES, {
    variables: {
      userId: "6451a787de4c08d54ed8da35",
    },
  });

  const { data: dataSuplier } = useQuery(SUPLIERS);

  const categorySelect = (
    <select
      onChange={(e) =>
        setItemSelected({ ...itemSelected, category: e.target.value })
      }
    >
      {data?.categories.map((item) => (
        <option key={item.name} value={item.name}>
          {item.name}
        </option>
      ))}
    </select>
  );

  type categoryItem = {
    name: string;
    subcategory: [string];
    __typename: string;
    _id: string;
  };

  const categorySelected: [categoryItem] = data?.categories.filter(
    (item) => item.name === itemSelected.category
  );

  const subcategorySelect = itemSelected.category !== "" && (
    <select>
      {categorySelected[0].subcategory.map((item: string) => {
        return <option>{item}</option>;
      })}
    </select>
  );

  const suplierSelect = (
    <select
      onChange={(e) =>
        setItemSelected({ ...itemSelected, suplier: e.target.value })
      }
    >
      {dataSuplier?.supliers.map((item) => {
        return (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        );
      })}
    </select>
  );

  return (
    <div>
      {categorySelect}
      {subcategorySelect}
      {suplierSelect}
    </div>
  );
};
