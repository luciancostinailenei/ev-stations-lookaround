import schema from "./schema";

import companyQueryResolver from "./resolvers/companyQueryResolver";
import companiesQueryResolver from "./resolvers/companiesQueryResolver";
import stationsQueryResolver from "./resolvers/stationsQueryResolvers";
import getAllCompanyStationsWithinRadiusResolver from "./resolvers/getAllCompanyStationsWithinRadiusResolver";

const queryResolvers = {
  Query: {
    company: companyQueryResolver,
    companies: companiesQueryResolver,
    stations: stationsQueryResolver,
    getAllCompanyStationsWithinRadius:
      getAllCompanyStationsWithinRadiusResolver,
  },
};

const resolvers = [queryResolvers];

export { schema, resolvers, getAllCompanyStationsWithinRadiusResolver };
