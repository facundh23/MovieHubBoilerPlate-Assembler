"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (process.env.NODE_ENV === "production") {
    dotenv_1.default.config({ path: ".env.production" });
}
else {
    dotenv_1.default.config({ path: ".env.development" });
}
const ENV = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "development";
const CONFIG = {
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
exports.default = CONFIG[ENV];
