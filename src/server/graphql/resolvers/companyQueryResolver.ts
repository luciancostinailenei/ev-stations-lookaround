import dbClient from "../../db/client";

const companiesQueryResolver = async (
  _: any,
  { id: inputCompanyId }: { id: number }
) => {
  const companies = await dbClient.company.findUnique({
    where: {
      id: inputCompanyId,
    },
  });

  return companies;
};

export default companiesQueryResolver;
