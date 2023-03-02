import dbClient from "../../db/client";

const companiesQueryResolver = async () => {
  const companies = await dbClient.company.findMany({
    orderBy: { name: "asc" },
  });

  return companies;
};

export default companiesQueryResolver;
