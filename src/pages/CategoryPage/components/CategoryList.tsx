import { useQuery } from "@apollo/client";
import { CATEGORIES } from "../../../queries/categories";
import { dispatchCategoryVar } from "./mutate-state";

export const CategoryList = () => {

  const { data, loading } = useQuery(CATEGORIES, {
    variables: {
      userId: "6451a787de4c08d54ed8da35",
    },
  });

  const listProducts =
    !loading &&
    data?.categories.map((item) => {
      return (
        <div key={item._id}>
          <strong>{item.name}</strong>
          <button
            onClick={() => {
              dispatchCategoryVar({
                _id: item._id,
                name: item.name,
                type: "update",
                edit: "category",
                openModal: true,
              });
            }}
          >
            {" "}
            Editar{" "}
          </button>

          <button
            onClick={() => {
              dispatchCategoryVar({
                _id: item._id,
                name: item.name,
                type: "delete",
                edit: "category",
                openModal: true,
              });
            }}
          >
            {" "}
            Excluir{" "}
          </button>

          {item.subcategory?.map((sub: string) => {
            return (
              <div key={sub}>
                <p>{sub}</p>
                <button
                  onClick={() => {
                    dispatchCategoryVar({
                      category: item._id,
                      categoryName: item.name,
                      name: sub,
                      type: "update",
                      edit: "subcategory",
                      openModal: true,
                    });
                  }}
                >
                  update
                </button>
                <button
                  onClick={() => {
                    dispatchCategoryVar({
                      category: item._id,
                      categoryName: item.name,
                      name: sub,
                      type: "delete",
                      edit: "subcategory",
                      openModal: true,
                    });
                  }}
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
      );
    });

  return <div>{listProducts}</div>;
};
