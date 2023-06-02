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

export const CREATE_SUPLIER = gql`
  mutation CreateSuplier($suplierInput: SuplierInput) {
    createSuplier(suplierInput: $suplierInput) {
      _id
      name
      userId
    }
  }
`;

export const UPDATE_SUPLIER = gql`
  mutation UpdateSuplier($suplierInput: SuplierInput) {
    updateSuplier(suplierInput: $suplierInput) {
      _id
      name
    }
  }
`;

export const DELETE_SUPLIER = gql`
  mutation DeleteSuplier($id: ID) {
    deleteSuplier(_id: $id) {
      _id
    }
  }
`;
