import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  CREATE_SUPLIER,
  DELETE_SUPLIER,
  UPDATE_SUPLIER,
} from "../../../queries/supliers";
import { client } from "../../../main";
import { useMutateState, initialValue } from "./mutate-state";

export const Suplier = () => {
  const [suplierState, setSuplierState] = useState({
    _id: "",
    name: "",
    userId: "6451a787de4c08d54ed8da35",
  });
  const { state, dispatch } = useMutateState();

  console.log("renderizou teste1234", state);

  const [createSuplier] = useMutation(CREATE_SUPLIER, {
    update: (cache, { data }) => {
      const cacheId: string | any = cache.identify(data.createSuplier);
      cache.modify({
        fields: {
          supliers: (existingFieldData, { toReference }) => {
            return [...existingFieldData, toReference(cacheId)];
          },
        },
      });
    },
  });

  const [updateSuplier] = useMutation(UPDATE_SUPLIER, {
    update: (cache, { data: { updateSuplier } }) => {
      client.readFragment({
        id: `Suplier:${updateSuplier._id}`,
        fragment: gql`
          fragment MySuplier on Suplier {
            _id
            name
          }
        `,
      });
    },
  });

  const [deleteSuplier] = useMutation(DELETE_SUPLIER, {
    update: (cache, { data: { deleteSuplier } }) => {
      const normalizedId = cache.identify({
        _id: deleteSuplier._id,
        __typename: "Suplier",
      });
      cache.evict({ id: normalizedId });
    },
  });

  const handlerMutationSuplier = async () => {
    if (state.type === "create") {
      await createSuplier({
        variables: {
          suplierInput: {
            userid: suplierState.userId,
            name: state.name,
          },
        },
      });
      dispatch(initialValue);
    } else if (state.type === "update") {
      await updateSuplier({
        variables: {
          suplierInput: {
            _id: state._id,
            name: state.name,
          },
        },
      });
      dispatch(initialValue);
    } else {
      await deleteSuplier({
        variables: {
          id: state._id,
        },
      });
      dispatch(initialValue);
    }
  };

  return (
    <div>
      <h2>{state.type} Suplier</h2>
      <div>
        <input
          type="text"
          value={state.name}
          disabled={state.type === "delete" ? true : false}
          onChange={(e) => dispatch({ ...state, name: e.target.value })}
        />
        <button onClick={() => handlerMutationSuplier()}>{state.type}</button>
      </div>
    </div>
  );
};
