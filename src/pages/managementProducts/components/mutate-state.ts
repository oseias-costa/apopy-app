import { useState } from "react";
import { makeVar, useReactiveVar } from "@apollo/client";

type mutateProps = {
  _id: string;
  name: string;
  type: string;
  edit: string;
  categoryName?: string;
  openModal: boolean;
};

export const initialValue = {
  _id: "",
  name: "",
  type: "create",
  edit: "",
  categoryName: "",
  openModal: false,
};
export const useMutateState = () => {
  const [state, setState] = useState<mutateProps>(initialValue);

  const mutateStateFn = makeVar(state);
  useReactiveVar(mutateStateFn);

  const dispatch = (newState: mutateProps) => {
    // const newState = reducer(state)
    setState(newState);
  };

  return { state, dispatch: (s: mutateProps) => dispatch(s) };
};
