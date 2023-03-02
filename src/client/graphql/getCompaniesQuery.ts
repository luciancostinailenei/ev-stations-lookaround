import { gql } from "@apollo/client";

const GET_COMPANIES = gql`
  query companies {
    companies {
      id
      name
      parentCompanyId
    }
  }
`;

export default GET_COMPANIES;
