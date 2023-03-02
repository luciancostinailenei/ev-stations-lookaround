import { useQuery } from "@apollo/client";
import { Box, Flex, Text, SkeletonText, Heading } from "@chakra-ui/react";
import { GET_COMPANY_QUERY } from "../graphql";

type StationProps = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  companyId: number;
};

const Station = ({
  name,
  address,
  latitude,
  longitude,
  companyId,
}: StationProps) => {
  const { data: getCompanyQueryData, loading: isCompanyQueryLoading } =
    useQuery(GET_COMPANY_QUERY, {
      variables: { companyId },
    });

  return (
    <Box p="10px" borderRadius="3px" mb="20px" bgColor="#fefefe">
      <Heading size="sm" as="h4" mb="5px" color="teal.400">
        {name}
      </Heading>

      <Flex>
        <Text color="gray.500">Address: </Text>
        <Text as="b" color="cyan.600" ml="5px">
          {address}
        </Text>
      </Flex>
      <Flex>
        <Text color="gray.500">Latitude: </Text>
        <Text as="b" color="gray.600" ml="5px">
          {latitude}
        </Text>
      </Flex>
      <Flex>
        <Text color="gray.500">Longitude: </Text>
        <Text as="b" color="gray.600" ml="5px">
          {longitude}
        </Text>
      </Flex>
      <Flex alignItems="center">
        <Text color="gray.500">Owned by: </Text>

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
    </Box>
  );
};

export default Station;
