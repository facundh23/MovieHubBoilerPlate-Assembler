import dotenv from 'dotenv';

type TConfig = {
    [key: string]: EnviromentConfig;
};

type EnviromentConfig = {
    app: AppConfig,

};

type AppConfig = {
    PORT: string | number
};

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: ".env.production" })
} else {
    dotenv.config({ path: ".env" })
}

const ENV = process.env.NODE_ENV ?? "development"

const CONFIG: TConfig = {
    development: {
        app: {
            PORT: process.env.PORT || 3000,
        },
    },
    production: {
        app: {
            PORT: process.env.PORT || 4001
        }
    },

}

export default CONFIG[ENV];