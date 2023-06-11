import { gql, useMutation } from "@apollo/client";
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../../../queries/categories";
import { client } from "../../../main";
import { initialValue, useMutateState } from "./mutate-state";

export const Category = () => {
  const { state, dispatch } = useMutateState();

  const [createCategory] = useMutation(ADD_CATEGORY, {
    update: (cache, { data }) => {
      const cacheId: any = cache.identify(data.createCategory);
      cache.modify({
        fields: {
          categories: (existingFieldData, { toReference }) => {
            return [...existingFieldData, toReference(cacheId)];
          },
        },
      });
    },
  });

  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    update(cache, { data: { updateCategory } }) {
      client.readFragment({
        id: `Category:${updateCategory._id}`,
        fragment: gql`
          fragment MyCategory on Category {
            _id
            name
          }
        `,
      });
    },
  });

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    update: (cache, { data: { deleteCategory } }) => {
      const normalizedId = cache.identify({
        _id: deleteCategory._id,
        __typename: "Category",
      });
      cache.evict({ id: normalizedId });
    },
  });

  const handleCategoryMutation = async () => {
    if (state.type === "create") {
      await createCategory({
        variables: {
          categoryInput: {
            name: state.name,
            userId: "6451a787de4c08d54ed8da35",
          },
        },
      });
      dispatch(initialValue);
    } else if (state.type === "update") {
      await updateCategory({
        variables: {
          categoryEdit: {
            _id: state._id,
            name: state.name,
          },
        },
      });
      dispatch(initialValue);
    } else {
      await deleteCategory({
        variables: {
          categoryEdit: {
            _id: state._id,
          },
        },
      });
      dispatch(initialValue);
    }
  };

  return (
    <div>
      <div>
        <h2>{state().type}</h2>
        <input
          type="text"
          value={state().name}
          disabled={state().type === "delete" ? true : false}
          onChange={(e) => dispatch({ ...state(), name: e.target.value })}
        />
        <button type="submit" onClick={() => handleCategoryMutation()}>
          {state().type}
        </button>
        <button
          type="submit"
          onClick={() => {
            dispatch(initialValue);
          }}
        >
          Desfazer
        </button>
      </div>
    </div>
  );
};
