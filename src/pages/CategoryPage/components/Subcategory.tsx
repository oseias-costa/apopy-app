import { useState, useEffect } from "react";
import { useQuery, useMutation, gql, useReactiveVar } from "@apollo/client";
import { CATEGORIES } from "../../../queries/categories";
import {
  CREATE_SUBCATEGORY,
  DELETE_SUBCATEGORY,
  UPDATE_SUBCATEGORY,
} from "../../../queries/subcategories";
import { initialValue, dispatchCategoryVar } from "./mutate-state";

type SubcategoryType = {
  _id: string;
  category: string;
  subcategory: string;
  newSubcategory: string;
};

const initialSubcategoryState = {
  _id: "",
  category: "",
  subcategory: "",
  newSubcategory: "",
};

export const Subcategory = () => {
  const [subcategoryState, setSubcategoryState] = useState<SubcategoryType>(
    initialSubcategoryState
  );
  const state = useReactiveVar(dispatchCategoryVar)

  useEffect(() => {
    if (state.categoryName) {
      return setSubcategoryState({
        ...subcategoryState,
        subcategory: state.name,
        newSubcategory: state.name,
      });
    }

    if (state.type === "create") {
      return setSubcategoryState({ ...subcategoryState, subcategory: "" });
    }
  }, [state]);

  const { data } = useQuery(CATEGORIES, {
    variables: {
      userId: "6451a787de4c08d54ed8da35",
    },
  });

  const [createSubcategory] = useMutation(CREATE_SUBCATEGORY, {
    update: (cache, { data }) => {
      const newSubcategoryRef = cache.writeFragment({
        fragment: gql`
          fragment MyCategory on Category {
            _id
            name
            subcategory
          }
        `,
        data: data.createSubcategory,
        variables: { _id: data.createSubcategory._id },
      });
      cache.modify({
        fields: {
          categories(existing) {
            const newData = existing.filter(
              (item: { __ref: string }) => item !== newSubcategoryRef
            );
            return [...newData, newSubcategoryRef];
          },
        },
      });
    },
  });

  const [updateSubcategory] = useMutation(UPDATE_SUBCATEGORY, {
    update(cache, { data }) {
      const newSubcategoryRef = cache.writeFragment({
        fragment: gql`
          fragment MyCategory on Category {
            _id
            name
            subcategory
          }
        `,
        data: data.updateSubcategory,
        variables: { _id: data.updateSubcategory._id },
      });
      cache.modify({
        fields: {
          categories(existing) {
            const newData = existing.filter(
              (item: { __ref: string }) => item !== newSubcategoryRef
            );
            return [...newData, newSubcategoryRef];
          },
        },
      });
    },
  });

  const [deleteSubcategory] = useMutation(DELETE_SUBCATEGORY, {
    update(cache, { data }) {
      const newSubcategoryRef = cache.writeFragment({
        fragment: gql`
          fragment MyCategory on Category {
            _id
            name
            subcategory
          }
        `,
        data: data.deleteSubcategory,
        variables: { _id: data.deleteSubcategory._id },
      });
      cache.modify({
        fields: {
          categories(existing) {
            const newData = existing.filter(
              (item: { __ref: string }) => item !== newSubcategoryRef
            );
            return [...newData, newSubcategoryRef];
          },
        },
      });
    },
  });

  const handlerSubcategoryMutation = () => {
    if (state.type === "create") {
      createSubcategory({
        variables: {
          subcategoryInput: {
            name: subcategoryState.subcategory,
            category: subcategoryState.category,
          },
        },
      });
      dispatchCategoryVar(initialValue);
      setSubcategoryState(initialSubcategoryState);
    } else if (state.type === "update") {
      updateSubcategory({
        variables: {
          subcategoryEdit: {
            newName: subcategoryState.subcategory,
            name: subcategoryState.newSubcategory,
            category: state.category,
          },
        },
      });
      dispatchCategoryVar(initialValue);
      setSubcategoryState(initialSubcategoryState);
    } else {
      deleteSubcategory({
        variables: {
          subcategoryEdit: {
            name: state.name,
            category: state.category,
          },
        },
      });
      dispatchCategoryVar(initialValue);
      setSubcategoryState(initialSubcategoryState);
    }
  };

  return (
    <div>
      <h2>Subcategory</h2>
      {data && state?.type === "create" ? (
        <select
          onChange={(e) =>
            setSubcategoryState({
              ...subcategoryState,
              category: e.target.value,
            })
          }
        >
          {data?.categories.map((item: { _id: string; name: string }) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      ) : (
        <select disabled={true}>
          <option>{state.categoryName}</option>
        </select>
      )}
      {state?.type !== "delete" ? (
        <>
          <input
            type="text"
            value={subcategoryState.subcategory}
            onChange={(e) =>
              setSubcategoryState({
                ...subcategoryState,
                subcategory: e.target.value,
              })
            }
          />
        </>
      ) : (
        <>
          <input type="text" value={state.name} disabled={true} />
        </>
      )}
      <button onClick={handlerSubcategoryMutation}>{state.type}</button>
      <button onClick={() => dispatchCategoryVar(initialValue)}>Cancel</button>
    </div>
  );
};
