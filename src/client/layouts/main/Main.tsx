import { useState, useEffect } from "react";
import {
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Heading,
  Flex,
  Box,
} from "@chakra-ui/react";
import { FcGlobe, FcElectricity } from "react-icons/fc";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { useLazyQuery } from "@apollo/client";

import { CompanyList, StationList } from "@/client/components";
import { Station } from "@/shared/models";
import MainContext from "./MainContext";
import { GET_ALL_COMPANY_STATIONS_WITHIN_RADIUS } from "@/client/graphql";

export default function Main() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [stations, setStations] = useState<Station[]>([]);
  const [radius, setRadius] = useState<number | null>(null);
  const [inputsError, setInputsError] = useState<string>("");
  const [
    getAllCompanyStationsWithinRadius,
    {
      loading: isStationsQueryLoading,
      data: stationsQueryData,
      error: stationsQueryError,
      called: isStationsQueryCalled,
    },
  ] = useLazyQuery(GET_ALL_COMPANY_STATIONS_WITHIN_RADIUS);

  useEffect(() => {
    if (stationsQueryData) {
      const { getAllCompanyStationsWithinRadius: stations } = stationsQueryData;
      setStations(stations);
    }
  }, [stationsQueryData]);

  return (
    <MainContext.Provider
      value={{
        latitude,
        longitude,
        radius,
        inputsError,
        stations,
        setLatitude,
        setLongitude,
        setRadius,
        setInputsError,
        setStations,
        getAllCompanyStationsWithinRadius,
        isStationsQueryLoading,
        isStationsQueryCalled,
        stationsQueryError,
      }}
    >
      <Heading
        as="h1"
        pl="35px"
        display="flex"
        alignItems="center"
        color="gray.600"
      >
        <Icon as={FcElectricity} color="gray.300" />
        EV Stations Lookaround
      </Heading>

      <Flex p="30px">
        <Box p="20px">
          <Heading as="h2" size="md" mb="25px" color="gray.600">
            Coordinates
          </Heading>

          <Stack spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FcGlobe} color="gray.300" />
              </InputLeftElement>
              <Input
                type="number"
                placeholder="Latitude*"
                onChange={(e) => setLatitude(+e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FcGlobe} color="gray.300" />
              </InputLeftElement>
              <Input
                type="number"
                placeholder="Longitude*"
                onChange={(e) => setLongitude(+e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={AiOutlineArrowsAlt} />
              </InputLeftElement>
              <Input
                type="number"
                placeholder="Radius(KM)*"
                onChange={(e) => setRadius(+e.target.value)}
              />
            </InputGroup>
          </Stack>

          {inputsError && (
            <Box
              mt="15px"
              borderRadius="3px"
              bg="red.400"
              w="100%"
              p={4}
              color="white"
            >
              * Inputs must be filled first
            </Box>
          )}
        </Box>

        <CompanyList />

        <StationList />
      </Flex>
    </MainContext.Provider>
  );
}
