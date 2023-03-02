import { Company as CompanyType } from "@/shared/models";
import { useQuery } from "@apollo/client";
import { Box, Heading, Stack } from "@chakra-ui/react";

import Company from "./Company";
import { GET_COMPANIES } from "../graphql";
import SkeletonStack from "./SkeletonStack";

const CompanyList = () => {
  const {
    loading,
    error,
    data: companyQueryResult,
  } = useQuery<{ companies: CompanyType[] }>(GET_COMPANIES);

  const CompanyListContent = () => {
    if (loading || error) {
      return <SkeletonStack width="215px" height="50px" skeletonsNumber={3} />;
    }

    return (
      <Stack>
        {companyQueryResult?.companies.map(({ id, name, parentCompanyId }) => (
          <Company
            parentCompanyId={parentCompanyId}
            companyId={id}
            name={name}
            key={`company-${id}`}
          />
        ))}
      </Stack>
    );
  };

  return (
    <Box p="20px">
      <Heading as="h2" size="md" mb="25px" color="gray.600">
        Choose company
      </Heading>
      <CompanyListContent />
    </Box>
  );
};

export default CompanyList;
