import { useQuery } from "@apollo/client";
import { SUPLIERS } from "../../../queries/supliers";

export const SuplierList = ({setMutateState, setOpenModal}) => {
    const { data, loading, error } = useQuery(SUPLIERS);

    const listSupliers = data?.supliers.map((item) => {
        return(
            <div>
                <p key={item._id}>{item.name}</p>
                <button onClick={() => {
                    setMutateState({ _id: item._id, name: item.name, type: "update", edit: 'suplier' })
                    setOpenModal(true)
                }}>editar</button>
                <button onClick={() => {
                    setMutateState({ _id: item._id, name: item.name, type: "delete", edit: 'suplier' })
                    setOpenModal(true)
                }}>Delete</button>
            </div>)
        }
      );
    return(
        <div>{listSupliers}</div>
    )
}