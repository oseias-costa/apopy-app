import { useQuery } from "@apollo/client";
import { SUPLIERS } from "../../queries/stock/supliers";

export const Supliers = () => {
  const { data, loading, error } = useQuery(SUPLIERS);
  const listSupliers = data?.supliers.map((item) => (
    <p key={item._id}>{item.name}</p>
  ));

  return <div>{!loading && listSupliers}</div>;
};
