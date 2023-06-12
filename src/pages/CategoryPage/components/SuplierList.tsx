import { useQuery, useReactiveVar } from "@apollo/client";
import { SUPLIERS } from "../../../queries/supliers";
import { dispatchCategoryVar } from "./mutate-state";

export const SuplierList = () => {
    const { data } = useQuery(SUPLIERS);

    const listSupliers = data?.supliers.map((item) => {
        return(
            <div>
                <p key={item._id}>{item.name}</p>
                <button onClick={() => {
                    dispatchCategoryVar({ 
                        _id: item._id, 
                        name: item.name, 
                        type: "update", 
                        edit: 'suplier', 
                        openModal: true
                    })
                }}>editar</button>
                <button onClick={() => {
                    dispatchCategoryVar({ 
                        _id: item._id, 
                        name: item.name, 
                        type: "delete", 
                        edit: 'suplier',  
                        openModal: true 
                    })
                }}>Delete</button>
            </div>)
        }
      );
    return(
        <div>{listSupliers}</div>
    )
}