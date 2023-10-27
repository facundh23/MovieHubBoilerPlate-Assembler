"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_controller_1 = require("../../controller/movies/movie.controller");
const moviesRoutes = (0, express_1.Router)();
moviesRoutes
    .get("/", movie_controller_1.getAllMovies)
    .get("/movies/movie/:movieId", movie_controller_1.getMovieById)
    .post("/movies/:userID", movie_controller_1.createMovie)
    .delete("/movies/:movieId", movie_controller_1.deleteMovieById)
    .put("/movies/edit/:movieId", movie_controller_1.updateMovie);
exports.default = moviesRoutes;
