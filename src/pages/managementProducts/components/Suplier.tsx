
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { CREATE_SUPLIER, DELETE_SUPLIER, UPDATE_SUPLIER } from "../../../queries/supliers";
import { client } from "../../../main";

export const Suplier = ({ setOpenModal, setMutateState, mutateState }: {setOpenModal: (value: boolean) => void, setMutateState: () => void, mutateState: {name: string, _id: string, type: string, edit: string}}) => {
  const [suplierState, setSuplierState] = useState({
    _id: "",
    name: "",
    userId: "6451a787de4c08d54ed8da35",
  });



  console.log('renderizou', mutateState)

  const [ createSuplier ] = useMutation(
    CREATE_SUPLIER,
    {
      update: (cache, { data }) => {
        const cacheId: string | any = cache.identify(data.createSuplier);
        console.log(data);
        cache.modify({
          fields: {
            supliers: (existingFieldData, { toReference }) => {
              return [...existingFieldData, toReference(cacheId)];
            },
          },
        })
      }
    }
  );

  const [ updateSuplier ] = useMutation(UPDATE_SUPLIER, {
    update: (cache, { data: {updateSuplier} }) => {
      client.readFragment({
        id: `Suplier:${updateSuplier._id}`,
        fragment: gql`
          fragment MySuplier on Suplier {
            _id
            name
          }
        `,
      })
    }
  })
 
  const [ deleteSuplier, error ] = useMutation(DELETE_SUPLIER, {
    update: (cache, { data: { deleteSuplier } }) => {
      const normalizedId = cache.identify({
        _id: deleteSuplier._id,
        __typename: "Suplier",
      });
      cache.evict({ id: normalizedId });
    },
  })

  console.log(error)

  const handlerMutationSuplier = async () => {
    if(mutateState.type === 'create'){
      await createSuplier({
        variables: {
          suplierInput: {
            userid: suplierState.userId,
            name: mutateState.name,
          },
        },
      })
      setOpenModal(false)
    } else if(mutateState.type === 'update'){
      await updateSuplier({
        variables: {
          suplierInput: {
            _id: mutateState._id,
            name: mutateState.name
          }
        }
      })
      setOpenModal(false)
  } else {
    await deleteSuplier({
      variables: {
          id: mutateState._id
      }
    })
    setOpenModal(false)
  }
}

  return (
    <div>
      <h2>{mutateState.type} Suplier</h2>
      <div>
        <input
          type="text"
          value={mutateState.name}
          disabled={mutateState.type === 'delete' ? true : false}
          onChange={(e) =>
            setMutateState({ ...mutateState, name: e.target.value })
          }
        />
        <button onClick={ () => handlerMutationSuplier() }>{mutateState.type}</button>
      </div>
    </div>
  );
};
