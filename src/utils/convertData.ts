import { DATA_SOURCE, mongoClient, postgresClient } from "../db/clientPrisma";
export const convertType = (id: string) => {
  if (DATA_SOURCE === "postgresql") {
    return Number(id);
  } else {
    return id;
  }
};
