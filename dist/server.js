"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const user_routes_1 = __importDefault(require("./routes/user/user.routes"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth/auth.routes"));
const movies_routes_1 = __importDefault(require("./routes/movies/movies.routes"));
const genre_routes_1 = __importDefault(require("./routes/genre/genre.routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
app.set("PORT", process.env.PORT || 3000);
app.use((0, morgan_1.default)("dev"));
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: "./uploads",
    abortOnLimit: true,
}));
app.use("/", auth_routes_1.default);
app.use("/users", user_routes_1.default);
app.use("/home", movies_routes_1.default);
app.use("/genres", genre_routes_1.default);
exports.default = app;
