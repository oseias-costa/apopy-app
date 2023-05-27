import { useQuery } from "@apollo/client";
import { CATEGORIES } from "../../queries/stock/categories";
import { Supliers } from "../../components/stock/Supliers";
import { CategoryData } from '../../types/stock/category.type'

export const Products = () => {
  const { data, loading, error } = useQuery(CATEGORIES, {
    variables: {
      userId: "6451a787de4c08d54ed8da35",
    },
  });
  const listProducts = !loading &&
    data?.categories.map((item: CategoryData) => {
      return (
        <div key={item._id}>
          <strong>{item.name}</strong>
          {item.subcategory?.map((sub: string) => (
            <p key={sub}>{sub}</p>
          ))}
        </div>
      );
    });

  return (
    <div>
      <h1>Products</h1>
      <div>{listProducts}</div>
      <h2>Fornecedores</h2>
      <Supliers />
    </div>
  );
};
