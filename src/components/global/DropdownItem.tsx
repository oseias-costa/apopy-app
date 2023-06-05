import styled, { keyframes } from "styled-components"

export const DropdownItem = ({ addItem, dropPosition, ref, setOpenModal, setMutateState} : { ref: any, addItem: boolean, dropPosition: { top: number, right: number}}) => {
    return(
        <Container addItem={addItem} dropPosition={dropPosition} ref={ref} id='dropMenuAdd'>
            <a onClick={() => {
                setMutateState({
                    _id: "",  name: "",  type: "create",  edit: 'category'
                })
                setOpenModal(true)}}>Categoria</a>
            <a>Subcategoria</a>
            <a onClick={() => {
                setMutateState({
                    _id: "",  name: "",  type: "create",  edit: 'suplier'
                })
                setOpenModal(true)}}>Fornecedor</a>
        </Container>
    )
}

const openMenu = keyframes`
    from {
        transform: translateY(-20px);
    } to {
        transform: translateY(0px);
    }
`

const Container = styled("div")<{ addItem : boolean, dropPosition: { top: number, right: number, left: number}}>`
    display: ${props => props.addItem === true ? 'flex' : 'none'};
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 5px;
    width: 200px;
    padding: 10px;
    top: ${props => {
        const res = props.dropPosition.top + 45
        return `${res}px`
        }};
    left: ${props => {
        const res = props.dropPosition.left 
        return `${res}px`
    }};
    transition: 2s linear;
    animation: ${openMenu} 0.15s linear;
`

