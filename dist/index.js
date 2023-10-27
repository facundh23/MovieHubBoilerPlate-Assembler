"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/config"));
const server_1 = __importDefault(require("./server"));
const PORT = config_1.default.app.PORT;
server_1.default.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
