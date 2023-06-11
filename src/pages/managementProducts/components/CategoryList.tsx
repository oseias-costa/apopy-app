import { useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { CATEGORIES } from "../../../queries/categories";
import { initialValue, testVar, useMutateState } from "./mutate-state";

export const CategoryList = () => {
  const { state, dispatch } = useMutateState();

  const usage = useReactiveVar(testVar);
  console.log("inicio", usage);
  const fn = () => {
    return testVar({
      _id: "1234",
      name: "oseias",
      type: "create",
      edit: "delete",
      categoryName: "",
      category: "",
      openModal: false,
    });
  };

  useEffect(() => {
    fn();
  }, []);
  console.log("novo teste", usage);

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
          <input
            type="checkbox"
            value={item.id}
            onChange={() =>
              dispatch({
                _id: item._id,
                name: item.name,
                type: "update",
                edit: "category",
                categorySelected: item._id,
                openModal: false,
              })
            }
          />
          <strong>{item.name}</strong>
          <button
            onClick={() => {
              dispatch({
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
              dispatch({
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
                    dispatch({
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
                    dispatch({
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
