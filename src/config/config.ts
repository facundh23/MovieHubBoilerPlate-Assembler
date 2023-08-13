import dotenv from "dotenv";

dotenv.config();

type TConfig = {
  [key: string]: EnviromentConfig;
};

type EnviromentConfig = {
  app: AppConfig;
  auth0?: Auth0Config;
};

type AppConfig = {
  PORT: string | number;
};

type Auth0Config = {
  client_origin: string | undefined;
  audience: string | undefined;
  issuer: string | undefined;
};

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.development" });
}

const ENV = process.env.NODE_ENV ?? "development";

const CONFIG: TConfig = {
  development: {
    app: {
      PORT: process.env.PORT || 3000,
    },
    auth0: {
      client_origin: process.env.APP_ORIGIN,
      audience: process.env.AUTH0_AUDIENCE,
      issuer: process.env.AUTH0_ISSUER,
    },
  },
  production: {
    app: {
      PORT: process.env.PORT || 4001,
    },
  },
};

export default CONFIG[ENV];
