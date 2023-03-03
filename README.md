# EV Stations Lookaround

A practice project that uses existing GIS APIs to demonstrate a search for nearby EV charging stations based on a provided location and distance radius.

## Tech stack

- [Node.js](https://nodejs.org/)
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [PostGIS](https://postgis.net/)

## Local development setup

### Pre-requisities

Make sure you have these tools installed on your local machine before proceeding:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

### Running

Follow the next steps in order to get the project up and running on your local machine:

1. Run `yarn` and waiting for the project's dependencies to be installed
2. Run `yarn prisma generate` to generate the Prisma database client based on the provided DB schema located inside prisma/ folder
   Check (Generating the client)[https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client] docs for more info.
3. Make sure you have Docker service started and run `docker-compose up -d db`
4. Create `.env` file by cloning `.env.example`
5. Run `yarn migrate:dev`
6. Run `yarn seed-db` (Feel free to adjust seeds located inside `prisma/seeds/seed.ts` based on your needs)
7. Run `yarn dev` and follow the given instructions to open the app on your browser

### Running the app as a docker image

1. Follow above described section points until bullet 6. included - if you haven't already followed those steps

2. Run `docker build -t [image-tag] .` \
   _Example:_ `docker build -t ev-stations-lookaround:v1 .`

3. Run `docker run --rm -it -p 8080:3000 --name [service-name] [image-tag]` \
   _Example:_ `docker run --rm -t -p 8080:3000 --name ev-stations-lookaround ev-stations-lookaround:v1`

4. Access `localhost:8080` in your browser to open the app

#### Observations

- docker-compose.yml file contains a service definition for a PgAdmin instance too; if you need to lookup the database settings, you can start it up too by running `docker-compose up -d pgadmin`

## Running integration tests

1. Run `docker-compose down` if you have the PgServer container running to avoid conflicting ports error for the test-db service that we're going to run (we need to work on a separate db to avoid data loss)
2. Run `yarn test-integration`
