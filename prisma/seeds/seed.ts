import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addCompaniesWithStations = async () => {
  try {
    const firstCompanyWithStations = await prisma.company.upsert({
      where: { name: "First Company" },
      update: {},
      create: {
        name: "First Company",
        parentCompanyId: null,
        stations: {
          create: [
            {
              name: "First Company Station 1",
              address: "Iasi, Soseaua Nicolina 148",
              latitude: 47.158455,
              longitude: 27.601442,
            },
            {
              name: "First Company Station 2",
              address: "Vaslui, Romania",
              latitude: 46.638088,
              longitude: 27.72876,
            },
            {
              name: "First Company Station 3",
              address: "Suceava, Romania",
              latitude: 47.663452,
              longitude: 26.27323,
            },
            {
              name: "First Company Station 4",
              address: "Suceava, Romania",
              latitude: 47.663452,
              longitude: 26.27323,
            },
            {
              name: "First Company Station 5",
              address: "Bacau, Romania",
              latitude: 46.562031,
              longitude: 26.91206,
            },
          ],
        },
      },
    });

    const secondCompanyWithStations = await prisma.company.upsert({
      where: { name: "First Company Child" },
      update: {},
      create: {
        name: "First Company Child",
        parentCompanyId: firstCompanyWithStations.id,
        stations: {
          create: [
            {
              name: "Child Company Station 1",
              address: "Vaslui, Romania",
              latitude: 46.638088,
              longitude: 27.72876,
            },
            {
              name: "Child Company Station 2",
              address: "Piatra Neamt, Romania",
              latitude: 46.931808,
              longitude: 26.36969,
            },
            {
              name: "Child Company Station 3",
              address: "Botosani, Romania",
              latitude: 47.8528263,
              longitude: 26.759334,
            },
            {
              name: "Child Company Station 4",
              address: "Botosani, Romania",
              latitude: 47.8528263,
              longitude: 26.759334,
            },
          ],
        },
      },
    });

    console.log(firstCompanyWithStations);
    console.log(secondCompanyWithStations);

    console.log("--- SUCCESSFULLY ADDED COMPANIES WITH STATIONS ---");
    console.log("! Run - npx prisma studio - for easy DB data lookup");
  } catch (e) {
    console.error(e);
  }
};

addCompaniesWithStations()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
