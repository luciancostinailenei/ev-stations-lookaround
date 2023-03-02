import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addCompaniesWithStations = async () => {
  try {
    const teslaCompanyWithStations = await prisma.company.upsert({
      where: { name: "Tesla" },
      update: {},
      create: {
        name: "Tesla",
        parentCompanyId: null,
        stations: {
          create: {
            name: "Tesla Station 1",
            address: "Iasi, Soseaua Nicolina 148",
            latitude: 47.158455,
            longitude: 27.601442,
          },
        },
      },
    });

    console.log(teslaCompanyWithStations);

    const teslaChildCompanyWithStations = await prisma.company.upsert({
      where: { name: "TeslaChild" },
      update: {},
      create: {
        name: "TeslaChild",
        parentCompanyId: teslaCompanyWithStations.id,
        stations: {
          create: {
            name: "Tesla Child Company Station 1",
            address: "Vaslui, Romania",
            latitude: 46.638088,
            longitude: 27.72876,
          },
        },
      },
    });

    console.log(teslaChildCompanyWithStations);

    console.log("--- SUCCESSFULLY ADDED COMPANIES WITH STATIONS ---");
    console.log("! Run - npx prisma studio - for easy DB data lookup")
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
