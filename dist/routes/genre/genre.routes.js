"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genre_controller_1 = require("../../controller/genre/genre.controller");
const genreRoutes = (0, express_1.Router)();
genreRoutes
    .get("/", genre_controller_1.showGenres)
    .post("/", genre_controller_1.addGenre)
    .post("/generatorGenre", genre_controller_1.generatorGenre)
    .delete("/:genreId", genre_controller_1.deleteGenreById);
exports.default = genreRoutes;
