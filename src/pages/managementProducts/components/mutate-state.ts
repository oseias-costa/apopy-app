import { useState, useEffect } from "react";
import { makeVar, useReactiveVar } from "@apollo/client";

type mutateProps = {
  _id?: string;
  name: string;
  type: string;
  edit: string;
  categoryName?: string;
  category?: string;
  openModal: boolean;
  categorySelected?: string;
};

export const initialValue = {
  _id: "",
  name: "",
  type: "create",
  edit: "",
  categoryName: "",
  category: "",
  openModal: false,
};
export const useMutateState = () => {
  const mutateStateVar = makeVar<mutateProps>(initialValue);

    const res = useReactiveVar(mutateStateVar)

   const dispatch = (newState: mutateProps) => {
    mutateStateVar(newState)
   };

  return { 
    state: res, 
    dispatch: (s: mutateProps) => dispatch(s)
  };
};
