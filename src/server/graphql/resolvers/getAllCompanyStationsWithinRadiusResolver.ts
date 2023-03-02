import { Prisma } from "@prisma/client";

import { Station, Company } from "../../../shared/models";

type getAllCompanyStationsWithinRadiusArgs = {
  companyId: number;
  latitude: number;
  longitude: number;
  radius: number;
};

const getAllCompanyStationsWithinRadius = async (
  _: any,
  {
    radiusQueryInput,
  }: { radiusQueryInput: getAllCompanyStationsWithinRadiusArgs }
): Promise<Station[]> => {
  const { companyId, latitude, longitude, radius } = radiusQueryInput;

  const childCompanies: Array<Company> = await prisma.company.findMany({
    where: {
      parentCompanyId: {
        equals: companyId,
      },
    },
  });
  const childCompaniesIds = childCompanies.map(({ id }) => id);
  const childCompaniesIdsToken = Prisma.join([companyId, ...childCompaniesIds]);

  //? constants like 4326, or 3552 represent a SRID value
  const nearbyStations = await prisma.$queryRaw<Station[]>`WITH cd AS (
    SELECT *, ST_MakePoint(longitude, latitude) <-> ST_MakePoint(${longitude}::FLOAT, ${latitude}::FLOAT) AS dist, ST_AsText(ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)) AS geom
    FROM "Station"
    WHERE "companyId" IN (${childCompaniesIdsToken})
    AND ST_DWithin(Geography(ST_MakePoint(longitude, latitude)), Geography(ST_MakePoint(${longitude}::FLOAT, ${latitude}::FLOAT)), ${radius} * 1000)
    )
    SELECT ST_ClusterDBSCAN(ST_Transform(ST_GeomFromTexT(geom, 4326), 3552), eps := 10, minpoints := 2) over () AS cid, id, name, address, latitude, longitude, "companyId"
    FROM cd
    ORDER BY 1 ASC
  `;

  return nearbyStations;
};

export default getAllCompanyStationsWithinRadius;
