import { gql } from "@apollo/client";

const GET_COMPANY_QUERY = gql`
  query getAllCompanyStationsWithinRadius($companyId: Int!) {
    company(id: $companyId) {
      name
    }
  }
`;

export default GET_COMPANY_QUERY;
