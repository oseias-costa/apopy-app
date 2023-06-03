import { styled } from "styled-components"

export const DropdownItem = ({ addItem, dropPosition} : { addItem: boolean, dropPosition: { top: number, right: number}}) => {
    console.log('teste no drop', dropPosition)
    return(
        <Container addItem={addItem} dropPosition={dropPosition}>
        <li>
            <a>Categoria</a>
        </li>
        <li>
            <a>Subcategoria</a>
        </li>
        <li>
            <a>Fornecedor</a>
        </li>
        </Container>
    )
}

const Container = styled("ul")<{ addItem : boolean, dropPosition: { top: number, right: number, left: number}}>`
    display: ${props => props.addItem === true ? 'block' : 'none'};
    position: absolute;
    background-color: #fff;
    border-radius: 5px;
    top: ${props => {
        const res = props.dropPosition.top + 30
        return `${res}px`
        }};
    left: ${props => {
        const res = props.dropPosition.left 
        console.log('left', res)
        return `${res}px`
    }};
`