import { useReactiveVar } from '@apollo/client'
import { styled } from "styled-components";
import {
  dispatchCategoryVar,
  initialValue
} from "../../pages/CategoryPage/components/mutate-state";
import { dispatchProductVar } from '../../pages/ProductsPage/components/productVar';

export const ModalProduct = ({ children }: { children: React.ReactNode }) => {
const state = useReactiveVar(dispatchCategoryVar)
const stateProduct = useReactiveVar(dispatchProductVar)

  document.addEventListener("click", (e) => {
    if (e.target === document.getElementById("modalCreateCategory")) {
      dispatchCategoryVar(initialValue);
      dispatchProductVar(initialValue)
    }
  });
  return (
    <ModalContainer openModal={state.openModal || stateProduct.openModal} id="modalCreateCategory">
      <Modal>{children}</Modal>
    </ModalContainer>
  );
};

const ModalContainer = styled("div")<{ openModal: boolean }>`
  display: ${(props) => (props.openModal === true ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.7);
`;

const Modal = styled.div`
  background-color: #fff;
  width: 400px;
  height: 400px;
`;
