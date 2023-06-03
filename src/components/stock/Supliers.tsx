import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { SUPLIERS, CREATE_SUPLIER, UPDATE_SUPLIER } from "../../queries/supliers";
import { SuplierData } from "../../types/stock/supliers.type";
import { client } from "../../main";

export const Supliers = () => {
  const [suplierState, setSuplierState] = useState({
    _id: "",
    name: "",
    userId: "6451a787de4c08d54ed8da35",
  });
  const { data, loading, error } = useQuery(SUPLIERS);
  const [createSuplier, { data: createData, error: createError }] = useMutation(
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

  // const [ updateSuplier ] = useQuery(UPDATE_SUPLIER)

  console.log("criado suplier", createData);
  console.log("erro create", createError);

  const listSupliers = data?.supliers.map((item: SuplierData) => (
    <p key={item._id}>{item.name}</p>
  ));

  return (
    <div>
      {!loading && listSupliers}
      <div>
        <input
          type="text"
          value={suplierState.name}
          onChange={(e) =>
            setSuplierState({ ...suplierState, name: e.target.value })
          }
        />
        <button
          onClick={async () =>
            await createSuplier({
              variables: {
                suplierInput: {
                  userid: suplierState.userId,
                  name: suplierState.name,
                },
              },
            })
          }
        >
          Create
        </button>
      </div>
    </div>
  );
};
