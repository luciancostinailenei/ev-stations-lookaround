import { gql } from "@apollo/client";

const GET_ALL_COMPANY_STATIONS_WITHIN_RADIUS = gql`
  query getAllCompanyStationsWithinRadius(
    $radiusQueryInput: RadiusQueryInputType
  ) {
    getAllCompanyStationsWithinRadius(radiusQueryInput: $radiusQueryInput) {
      id
      name
      address
      latitude
      longitude
      companyId
    }
  }
`;

export default GET_ALL_COMPANY_STATIONS_WITHIN_RADIUS;
