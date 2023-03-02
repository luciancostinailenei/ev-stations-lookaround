const schema = `
  type Station {
    id: Int!
    name: String!
    address: String!
    latitude: Float!
    longitude: Float!
    companyId: Int!
  }

  type Company {
    id: Int!
    name: String!
    parentCompanyId: Int
  }

  input RadiusQueryInputType {
    companyId: Int!
    latitude: Float!
    longitude: Float!
    radius: Int!
  }

  type Query {
    company(id: Int!): Company
    companies: [Company]
    stations: [Station]
    getAllCompanyStationsWithinRadius(radiusQueryInput: RadiusQueryInputType): [Station]
  }
`;

export default schema;
