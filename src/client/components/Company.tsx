import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Box, Flex, Text, Heading, SkeletonText } from "@chakra-ui/react";

import MainContext from "../layouts/main/MainContext";
import { GET_COMPANY_QUERY } from "../graphql";

type CompanyProps = {
  companyId: number;
  name: string;
  parentCompanyId: number | null;
};

const Company = ({ name, companyId, parentCompanyId }: CompanyProps) => {
  const {
    getAllCompanyStationsWithinRadius,
    latitude,
    longitude,
    radius,
    inputsError,
    setInputsError,
  } = useContext(MainContext);

  const { data: getCompanyQueryData, loading: isCompanyQueryLoading } =
    useQuery(GET_COMPANY_QUERY, {
      variables: { companyId: parentCompanyId },
    });

  const onClickCompany = (companyId: number) => {
    if (!latitude || !longitude || !radius) {
      setInputsError("At least one of the inputs is empty.");
      return;
    }

    if (latitude && longitude && radius && inputsError) {
      setInputsError("");
    }

    getAllCompanyStationsWithinRadius({
      variables: {
        radiusQueryInput: {
          companyId,
          latitude,
          longitude,
          radius,
        },
      },
    });
  };

  return (
    <Box
      sx={{ "&:hover": { cursor: "pointer" } }}
      p="10px"
      borderRadius="3px"
      mb="10px"
      bgColor="#fefefe"
      onClick={() => onClickCompany(companyId)}
    >
      <Heading size="sm" as="h3" mb="5px" color="teal.500">
        {name}
      </Heading>

      {parentCompanyId && (
        <Flex>
          <Text color="gray.500">Parent Company: </Text>

          {isCompanyQueryLoading ? (
            <SkeletonText
              ml="5px"
              noOfLines={1}
              width="150px"
              skeletonHeight="2"
            />
          ) : (
            <Text as="b" color="teal.500" ml="5px">
              {getCompanyQueryData.company.name}
            </Text>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default Company;
