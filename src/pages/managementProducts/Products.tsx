import { useState, useRef, useEffect } from "react";
import { DropdownItem } from "../../components/global/DropdownItem";
import { styled } from "styled-components";
import { ModalProduct } from "../../components/global/ModalAddItem";
import { Category } from "./components/Category";
import { CategoryList } from "./components/CategoryList";
import { SuplierList } from "./components/SuplierList";
import { Suplier } from "./components/Suplier";
import { Subcategory } from "./components/Subcategory";
import { initialValue, useMutateState } from "./components/mutate-state";

type categoryStateType = {
  [key: string]: string;
};

type typeModal = {
  [key: string]: React.ReactNode;
};

type MutationStateObject = {
  name: string;
  _id: string;
  type: string;
  edit: string;
};

export const Products = () => {
  const [addItem, setAddItem] = useState<boolean>(false);
  const [dropPosition, setDropPosition] = useState({});
  const addRef = useRef<HTMLButtonElement>(null);
  const DOMNode = useRef<HTMLDivElement>(null);
  const [mutateState, setMutateState] = useState<MutationStateObject>({
    _id: "",
    name: "",
    type: "create",
    edit: "",
  });

  const  { state, dispatch } = useMutateState()

  console.log('inicio', state) 
  dispatch({ ...initialValue, name: 'oseias'})
  console.log('novo teste', state)

  const typeModal: typeModal = {
    category: <Category />,
    suplier: <Suplier />,
    subcategory: <Subcategory />,
  };

  const handleAdd = () => {
    addRef.current && setDropPosition(addRef.current.getBoundingClientRect());
    setAddItem(!addItem);
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        e.target !== document.getElementById("dropMenuAdd") &&
        e.target !== addRef.current
      ) {
        setAddItem(false);
      }
    });
  }, []);

  return (
    <div>
      <button onClick={() => handleAdd()} ref={addRef}>
        Add Item
      </button>
      <DropdownItem
        addItem={addItem}
        dropPosition={dropPosition}
        ref={DOMNode}
        setMutateState={setMutateState}
      />
      <h1>Products</h1>
      <CategoryList />
      <h2>Fornecedores</h2>
      <SuplierList />
      <ModalProduct children={typeModal[mutateState.edit]} state={state} />
    </div>
  );
};
