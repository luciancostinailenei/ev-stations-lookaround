import { useContext } from "react";
import { Box, Heading, Stack, Text, Icon } from "@chakra-ui/react";
import { BiSad } from "react-icons/bi";
import MainContext from "../layouts/main/MainContext";
import { Station as StationType } from "@/shared/models";
import Station from "./Station";
import SkeletonStack from "./SkeletonStack";

const StationList = () => {
  const {
    stations,
    isStationsQueryLoading,
    isStationsQueryCalled,
    stationsQueryError,
  } = useContext(MainContext);

  const StationListContent = () => {
    if (isStationsQueryLoading || stationsQueryError) {
      return <SkeletonStack width="100%" height="100px" skeletonsNumber={5} />;
    }

    if (isStationsQueryCalled && stations.length === 0) {
      return (
        <Text display="flex" alignItems="center" fontSize="lg" color="teal.500">
          <Icon mr="5px" as={BiSad} />
          No nearby stations have been found for this company.
        </Text>
      );
    }

    return (
      <Stack>
        {stations.map(
          ({
            id,
            name,
            address,
            latitude,
            longitude,
            companyId,
          }: StationType) => (
            <Station
              {...{ ...{ name, address, latitude, longitude, companyId } }}
              key={`station-${id}`}
            />
          )
        )}
      </Stack>
    );
  };

  return (
    <Box p="20px" flex="1">
      <Heading as="h2" size="md" mb="25px" color="gray.600">
        Stations
      </Heading>

      <StationListContent />
    </Box>
  );
};

export default StationList;
