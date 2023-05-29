import { useQuery } from "@apollo/client";
import { SUPLIERS } from "../../queries/supliers";
import { SuplierData } from '../../types/stock/supliers.type'

export const Supliers = () => {
  const { data, loading, error } = useQuery(SUPLIERS);
  const listSupliers = data?.supliers.map((item: SuplierData) => (
    <p key={item._id}>{item.name}</p>
  ));

  return <div>{!loading && listSupliers}</div>;
};
