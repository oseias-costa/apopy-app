import { makeVar } from "@apollo/client";

export const initialValue = {
    _id: "",  
    name: "",  
    type: "",  
    edit: '', 
    openModal: false
}

export const dispatchProductVar = makeVar(initialValue)