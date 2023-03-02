import { createContext, Dispatch, SetStateAction } from "react";
import {
  ApolloError,
  LazyQueryExecFunction,
  OperationVariables,
} from "@apollo/client";

import { Station } from "../../../shared/models";

type MainContextType = {
  latitude: null | number;
  setLatitude: Dispatch<SetStateAction<null | number>>;
  longitude: null | number;
  setLongitude: Dispatch<SetStateAction<null | number>>;
  radius: null | number;
  inputsError: string;
  setRadius: Dispatch<SetStateAction<null | number>>;
  stations: Station[];
  setInputsError: Dispatch<SetStateAction<string>>;
  setStations: Dispatch<SetStateAction<Station[]>>;
  getAllCompanyStationsWithinRadius:
    | Function
    | LazyQueryExecFunction<Station[] | [], OperationVariables>;
  isStationsQueryLoading: boolean;
  isStationsQueryCalled: boolean;
  stationsQueryError: ApolloError | undefined;
};

const MainContext = createContext<MainContextType>({
  latitude: null,
  longitude: null,
  radius: null,
  inputsError: "",
  stations: [],
  setLatitude: () => {},
  setLongitude: () => {},
  setRadius: () => {},
  setStations: () => {},
  setInputsError: () => {},
  getAllCompanyStationsWithinRadius: () => {},
  isStationsQueryLoading: false,
  isStationsQueryCalled: false,
  stationsQueryError: undefined,
});

export default MainContext;
