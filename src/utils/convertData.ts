import { DATA_SOURCE } from "../db/clientPrisma";
export const convertType = (id: string) => {
  if (DATA_SOURCE === "postgresql") {
    return Number(id);
  } else {
    return id;
  }
};

export const convertVariableType = (value: any) => {
  if (typeof value === "string") {
    return (value = parseInt(value));
  }
};
