"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertVariableType = exports.convertType = void 0;
const clientPrisma_1 = require("../db/clientPrisma");
const convertType = (id) => {
    if (clientPrisma_1.DATA_SOURCE === "postgresql") {
        return Number(id);
    }
    else {
        return id;
    }
};
exports.convertType = convertType;
const convertVariableType = (value) => {
    if (typeof value === "string") {
        return (value = parseInt(value));
    }
};
exports.convertVariableType = convertVariableType;
