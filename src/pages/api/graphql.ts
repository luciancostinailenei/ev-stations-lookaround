import { createYoga, createSchema } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";

import { resolvers } from "../../server/graphql";
import { schema } from "../../server/graphql";

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  graphqlEndpoint: "/api/graphql",
  schema: createSchema({
    typeDefs: schema,
    resolvers,
  }),
});
