import { InputWithLabelProps } from "../../types/global/InputWithLabel"

export const InputWithLabel = ({ state, setState, key, label, placeholder }: InputWithLabelProps) => {
    return(
        <div>
            <label>{label}</label>
            <input 
                type='text' 
                value={state[key as keyof Object]} 
                onChange={(e) => setState({...state, [key]: e.target.value})} 
                placeholder={placeholder}
            />
        </div>
    )
}