import { PrismaClient as MongoClient } from "../../prisma/generated/mongo_client";
import { PrismaClient as PostgresClient } from "../../prisma/generated/postgresql_client";
import { Prisma } from "@prisma/client";

export const DATA_SOURCE = process.env.DATA_SOURCE ?? "mongo";

const prisma = new PrismaClient();

type ClientMongo = MongoClient<Prisma.PrismaClientOptions, never, DefatultArgs>;
type PostgresClient = PostgresClient<
  Prisma.PrismaClientOptions,
  never,
  DefatultArgs
>;
export const mongoClient: ClientMongo = new MongoClient();
export const mostgresClient: PostgresClient = new MongoClient();

// Aca en la grabacion es any el tipo
export let prismaClient: ClientMongo | PostgresClient;

if (DATA_SOURCE === "postgres") {
  prismaClient = postgresClient;
} else {
  prismaClient = mongoClient;
}

export default prisma;
