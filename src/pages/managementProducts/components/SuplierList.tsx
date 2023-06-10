import { useQuery } from "@apollo/client";
import { SUPLIERS } from "../../../queries/supliers";
import { useMutateState } from "./mutate-state";

export const SuplierList = () => {
    const { data } = useQuery(SUPLIERS);
    const { dispatch } = useMutateState()

    const listSupliers = data?.supliers.map((item) => {
        return(
            <div>
                <p key={item._id}>{item.name}</p>
                <button onClick={() => {
                    dispatch({ 
                        _id: item._id, 
                        name: item.name, 
                        type: "update", 
                        edit: 'suplier', 
                        openModal: true
                    })
                }}>editar</button>
                <button onClick={() => {
                    dispatch({ 
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