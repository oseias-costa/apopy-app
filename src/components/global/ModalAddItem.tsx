import { styled } from "styled-components"

export const ModalProduct = ({openModal, setOpenModal, children} : { openModal: boolean, children: React.ReactNode }) => {
    document.addEventListener('click', (e) => {
      if(e.target === document.getElementById('modalCreateCategory')){
        setOpenModal(false)
      }
    })
    return(
        <ModalContainer openModal={openModal} id='modalCreateCategory'>
            <Modal>{children}</Modal>
        </ModalContainer>
    )
  }
  
  const ModalContainer = styled("div")<{ openModal: boolean }>`
    display: ${ props => props.openModal === true ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgb(0,0,0,0.7);
  `
  
  const Modal = styled.div`
    background-color: #fff;
    width: 400px;
    height: 400px;
  `