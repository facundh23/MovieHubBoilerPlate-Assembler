"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwtMiddleware = void 0;
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const config_1 = __importDefault(require("../config/config"));
exports.checkJwtMiddleware = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: (_a = config_1.default.auth0) === null || _a === void 0 ? void 0 : _a.audience,
    issuerBaseURL: (_b = config_1.default.auth0) === null || _b === void 0 ? void 0 : _b.issuer,
});
