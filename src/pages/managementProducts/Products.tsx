import { useState, useRef, useEffect } from "react";
import { DropdownItem } from "../../components/global/DropdownItem";
import { styled } from "styled-components";
import { ModalProduct } from "../../components/global/ModalAddItem";
import { Category } from "./components/Category";
import { CategoryList } from "./components/CategoryList";
import { SuplierList } from "./components/SuplierList";
import { Suplier } from "./components/Suplier";

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
  const [openModal, setOpenModal] =
    useState<React.SetStateAction<boolean>>(false);
  const addRef = useRef<HTMLButtonElement>(null);
  const DOMNode = useRef<HTMLDivElement>(null);
  const [mutateState, setMutateState] = useState<MutationStateObject>({
    _id: "",
    name: "",
    type: "create",
    edit: "",
  });

  console.log(mutateState);

  const typeModal: typeModal = {
    category: (
      <Category
        setOpenModal={setOpenModal}
        categoryState={mutateState}
        setCategoryState={setMutateState}
      />
    ),
    suplier: (
      <Suplier
        setOpenModal={setOpenModal}
        mutateState={mutateState}
        setMutateState={setMutateState}
      />
    ),
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
        setOpenModal={setOpenModal}
        setMutateState={setMutateState}
      />
      <h1>Products</h1>
      <CategoryList
        setOpenModal={setOpenModal}
        setMutateState={setMutateState}
      />
      <h2>Fornecedores</h2>

      <SuplierList
        setOpenModal={setOpenModal}
        setMutateState={setMutateState}
      />
      <ModalProduct
        openModal={openModal}
        setOpenModal={setOpenModal}
        children={typeModal[mutateState.edit]}
      />
    </div>
  );
};
