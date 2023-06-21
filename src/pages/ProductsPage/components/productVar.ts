import { makeVar } from "@apollo/client";

export const initialValue = {
    _id: "",  
    name: "",  
    suplier: "",
    subcategory: "",
    category: "",
    type: "",  
    edit: '', 
    openModal: false
}

export const dispatchProductVar = makeVar(initialValue)