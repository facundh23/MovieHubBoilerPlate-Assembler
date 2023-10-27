"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = exports.DATA_SOURCE = void 0;
const client_1 = __importDefault(require("@prisma/client"));
exports.DATA_SOURCE = (_a = process.env.DATA_SOURCE) !== null && _a !== void 0 ? _a : "mongo";
exports.prismaClient = new client_1.default.PrismaClient();
