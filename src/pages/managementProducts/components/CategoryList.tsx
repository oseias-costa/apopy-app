import { useQuery } from "@apollo/client";
import { CATEGORIES } from "../../../queries/categories";


export const CategoryList = ({setMutateState, setOpenModal}) => {
    const { data, loading, error } = useQuery(CATEGORIES, {
        variables: {
          userId: "6451a787de4c08d54ed8da35",
        },
      });

    const listProducts =
    !loading &&
    data?.categories.map((item ) => {
      return (
        <div key={item._id}>
          <strong>{item.name}</strong>
          <button
            onClick={() =>
              { setMutateState({ _id: item._id, name: item.name, type: "update", edit: 'category' })
                setOpenModal(true) }
          }> Editar </button>

          <button
            onClick={() =>{ setMutateState({
                _id: item._id, name: item.name, type: "delete", edit: 'category' })
              setOpenModal(true)}
            }
          > Excluir </button>

          {item.subcategory?.map((sub: string) => (
            <p key={sub}>{sub}</p>
          ))}
        </div>
      );
    });

    return(
        <div>
            {listProducts}
        </div>
    )
}