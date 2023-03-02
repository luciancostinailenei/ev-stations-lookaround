import dbClient from "../../db/client";

const stationsQueryResolver = async () => {
  const stations = await dbClient.station.findMany({
    orderBy: { name: "asc" },
  });

  return stations;
};

export default stationsQueryResolver;
