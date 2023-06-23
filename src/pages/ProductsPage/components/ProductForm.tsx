import { useQuery, useReactiveVar } from "@apollo/client";
import { CATEGORIES } from "../../../queries/categories";
import { SUPLIERS } from "../../../queries/supliers";
import { dispatchProductVar } from "./productVar";

export const ProductForm = () => {
  const stateProducts = useReactiveVar(dispatchProductVar)

  const { data } = useQuery(CATEGORIES, {
    variables: {
      userId: "6451a787de4c08d54ed8da35",
    },
  });

  const { data: dataSuplier } = useQuery(SUPLIERS);

  const categorySelect = (
    <select
      onChange={(e) =>
        dispatchProductVar({ ...stateProducts, category: e.target.value })
      }
    >
      <option>{stateProducts.category !== '' ? stateProducts.category: 'Selecione'}</option>
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
    (item) => item.name === stateProducts.category
  );

  const subcategorySelect = stateProducts.category !== "" && (
    <select
      onChange={(e) =>
        dispatchProductVar({ ...stateProducts, subcategory: e.target.value })
      }
    >
      <option>{stateProducts.subcategory !== '' ? stateProducts.subcategory: 'Selecione'}</option>
      {categorySelected[0].subcategory?.map((item: string) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );

  const suplierSelect = (
    <select
      onChange={(e) =>
        dispatchProductVar({ ...stateProducts, suplier: e.target.value })
      }
    >
      <option>{stateProducts.suplier !== '' ? stateProducts.suplier: 'Selecione'}</option>
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
