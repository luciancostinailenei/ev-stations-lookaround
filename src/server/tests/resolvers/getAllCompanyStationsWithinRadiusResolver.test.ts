import { Company } from "@/shared/models";
import { getAllCompanyStationsWithinRadiusResolver } from "../../graphql";

let firstCompany: Company | null = null;
let secondCompany: Company | null = null;

beforeAll(async () => {
  firstCompany = await prisma.company.create({
    data: {
      name: "First Company",
    },
  });

  secondCompany = await prisma.company.create({
    data: {
      parentCompanyId: firstCompany.id,
      name: "First Company Child",
    },
  });

  const firstCompanyStations = await prisma.station.createMany({
    data: [
      {
        name: "First Company Station 1",
        address: "Iasi, Romania",
        latitude: 47.158455,
        longitude: 27.601442,
        companyId: firstCompany.id,
      },
      {
        name: "First Company Station 2",
        address: "Vaslui, Romania",
        latitude: 46.638088,
        longitude: 27.72876,
        companyId: secondCompany.id,
      },
      {
        name: "First Company Station 3",
        address: "Suceava, Romania",
        latitude: 47.663452,
        longitude: 26.27323,
        companyId: secondCompany.id,
      },
      {
        name: "First Company Station 4",
        address: "Suceava, Romania",
        latitude: 47.663452,
        longitude: 26.27323,
        companyId: secondCompany.id,
      },
      {
        name: "First Company Station 5",
        address: "Bacau, Romania",
        latitude: 46.562031,
        longitude: 26.91206,
        companyId: secondCompany.id,
      },
    ],
  });

  const secondCompanyStations = await prisma.station.createMany({
    data: [
      {
        name: "First Company Child Company Station 1",
        address: "Piatra Neamt, Romania",
        latitude: 46.931808,
        longitude: 26.36969,
        companyId: secondCompany.id,
      },
      {
        name: "First Company Child Company Station 2",
        address: "Botosani, Romania",
        latitude: 47.8528263,
        longitude: 26.759334,
        companyId: secondCompany.id,
      },
      {
        name: "First Company Child Company Station 3",
        address: "Botosani, Romania",
        latitude: 47.8528263,
        longitude: 26.759334,
        companyId: secondCompany.id,
      },
    ],
  });
});

it("should return all the created stations of the First Company and its children for a radius of 150km giving Iasi coordinates as reference point", async () => {
  const Iasi = { latitude: 47.158455, longitude: 27.601442 };
  const queryResult = await getAllCompanyStationsWithinRadiusResolver(
    {},
    {
      radiusQueryInput: {
        latitude: Iasi.latitude,
        longitude: Iasi.longitude,
        radius: 150,
        // @ts-ignore
        companyId: firstCompany.id,
      },
    }
  );

  expect(queryResult.length).toEqual(8);
});

it("should return Iasi and Vaslui stations for a radius of 70km giving Iasi coordinates as reference point", async () => {
  const Iasi = { latitude: 47.158455, longitude: 27.601442 };
  const queryResult = await getAllCompanyStationsWithinRadiusResolver(
    {},
    {
      radiusQueryInput: {
        latitude: Iasi.latitude,
        longitude: Iasi.longitude,
        radius: 70,
        // @ts-ignore
        companyId: firstCompany.id,
      },
    }
  );

  expect(queryResult.length).toEqual(2);
});

it("should return all the required properties for a station", async () => {
  const Iasi = { latitude: 47.158455, longitude: 27.601442 };
  const queryResult = await getAllCompanyStationsWithinRadiusResolver(
    {},
    {
      radiusQueryInput: {
        latitude: Iasi.latitude,
        longitude: Iasi.longitude,
        radius: 150,
        // @ts-ignore
        companyId: firstCompany.id,
      },
    }
  );

  const station = queryResult[0];

  expect(station).toHaveProperty("id");
  expect(station).toHaveProperty("name");
  expect(station).toHaveProperty("companyId");
  expect(station).toHaveProperty("address");
  expect(station).toHaveProperty("latitude");
  expect(station).toHaveProperty("longitude");
});

afterAll(async () => {
  await prisma.station.deleteMany();
  await prisma.company.deleteMany();
});
