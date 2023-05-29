import { gql } from "@apollo/client";

export const SUPLIERS = gql`
  query Suplier {
    supliers {
      _id
      name
      userId
    }
  }
`;
