import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  CATEGORIES,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../queries/categories";
import { Supliers } from "../components/stock/Supliers";
import { CategoryData, CategoryState } from "../types/category.type";
import { client } from "../main";

export const Products = () => {
  const [categoryState, setCategoryState] = useState<CategoryState>({
    _id: "",
    name: "",
    type: "create",
  });
  const { data, loading, error } = useQuery(CATEGORIES, {
    variables: {
      userId: "6451a787de4c08d54ed8da35",
    },
  });
  const [createCategory, { data: cData, loading: cLoading, error: cError }] =
    useMutation(ADD_CATEGORY, {
      update: (cache, { data: { createCategory } }) => {
        const { categories } = cache.readQuery({ query: CATEGORIES})

        cache.writeQuery({
          query: CATEGORIES,
          data: { categories },
        });
        // console.log('olhe:', data)
        // cache.modify({
        // fields: {
        //categories: (existingFieldData = []) => {
        // const newCategory = data.createCategory
        // cache.writeQuery({
        // query: CATEGORIES,
        //  data: { newCategory, ...existingFieldData }
        //     })
        //  }
        // }
        //})
      },
    });
  const [updateCategory, { data: eData, loading: eLoading, error: eError }] =
    useMutation(UPDATE_CATEGORY, {
      update(cache, { data }){

         cache.readQuery({ query: CATEGORIES })
        console.log('esse é o test: ', data)
        
        // cache.writeQuery({
        //   query: CATEGORIES,
        //   data: {
        //     categories: categories.filter(item => todo._id !== data.updateCategory._id)
        //   }
        // })
      }
    });

  const [ deleteCategory, { data: dData, loading: dLoading, error: dError }] =
    useMutation(DELETE_CATEGORY, {
      update: (cache, { data: { deleteCategory } }) => {
       const normalizedId = cache.identify({ _id: deleteCategory._id, __typename: "Category" })

       cache.evict({ id: normalizedId })
       cache.gc()
        console.log('esse é o cacheRead', normalizedId)
        // cache.writeQuery({
        //   query: CATEGORIES,
        //   data: {
        //     categories: Category.filter(categ => categ._id !== data.deleteCategory._id)
        //   }
        // })
      }
    });

  const handleMutation = async (
    categoryState: CategoryState,
    setCategoryState: React.Dispatch<React.SetStateAction<CategoryState>>
  ) => {
    if (categoryState.type === "create") {
      await createCategory({
        variables: {
          categoryInput: {
            name: categoryState.name,
            userId: "6451a787de4c08d54ed8da35",
          },
        },
      });
    } else if (categoryState.type === "update") {
      await updateCategory({
        variables: {
          categoryEdit: {
            _id: categoryState._id,
            name: categoryState.name,
          },
        },
      });
    } else {
      await deleteCategory({
        variables: {
          categoryEdit: {
            _id: categoryState._id,
          },
        },
      });
    }
  };

  const listProducts =
    !loading &&
    data?.categories.map((item: CategoryData) => {
      return (
        <div key={item._id}>
          <strong>{item.name}</strong>
          <button
            onClick={() =>
              setCategoryState({
                _id: item._id,
                name: item.name,
                type: "update",
              })
            }
          >
            Editar
          </button>

          <button
            onClick={() =>
              setCategoryState({
                _id: item._id,
                name: item.name,
                type: "delete",
              })
            }
          >
            Excluir
          </button>

          {item.subcategory?.map((sub: string) => (
            <p key={sub}>{sub}</p>
          ))}
        </div>
      );
    });

  console.log("query", data);
  return (
    <div>
      <h1>Products</h1>
      <div>
        <h2>Criar</h2>
        <input
          type="text"
          value={categoryState.name}
          onChange={(e) =>
            setCategoryState({ ...categoryState, name: e.target.value })
          }
        />
        <button
          type="submit"
          onClick={() => handleMutation(categoryState, setCategoryState)}
        >
          {categoryState.type}
        </button>
        <button
          type="submit"
          onClick={() =>
            setCategoryState({ _id: "", name: "", type: "create" })
          }
        >
          Desfazer
        </button>
      </div>
      <div>{listProducts}</div>
      <h2>Fornecedores</h2>
      <Supliers />
    </div>
  );
};
