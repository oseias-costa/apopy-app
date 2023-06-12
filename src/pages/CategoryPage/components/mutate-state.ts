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
  type: "",
  edit: "",
  categoryName: "",
  category: "",
  openModal: false,
};
export const dispatchCategoryVar = makeVar<mutateProps>(initialValue);

export const useMutateState = () => {
  const mutateStateVar = makeVar<mutateProps>(initialValue);

  return {
    state: () => useReactiveVar(mutateStateVar),
    dispatch: (newState: mutateProps) => mutateStateVar(newState),
  };
};

