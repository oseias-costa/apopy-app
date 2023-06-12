import styled, { keyframes } from "styled-components"
import { dispatchCategoryVar } from "../../pages/CategoryPage/components/mutate-state"


export const DropdownItem = ({ addItem, dropPosition, ref} : { ref: any, addItem: boolean, dropPosition: { top: number, right: number}}) => {
    const objDispatch = (editType: string) => {
        return {
            _id: "",  
            name: "",  
            type: "create",  
            edit: editType, 
            openModal: true
        }
    }

    return(
        <Container addItem={addItem} dropPosition={dropPosition} ref={ref} id='dropMenuAdd'>
            <a onClick={() => 
                dispatchCategoryVar(objDispatch('category'))
            }>Categoria</a>
            <a onClick={() => 
                dispatchCategoryVar(objDispatch('subcategory'))
            }>Subcategoria</a>
            <a onClick={() => 
            dispatchCategoryVar(objDispatch('suplier'))
            }>Fornecedor</a>
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
        const res = props.dropPosition.top + 25
        return `${res}px`
        }};
    left: ${props => {
        const res = props.dropPosition.left 
        return `${res}px`
    }};
    transition: 2s linear;
    animation: ${openMenu} 0.15s linear;

    a{ 
        cursor: pointer;
    }
`

