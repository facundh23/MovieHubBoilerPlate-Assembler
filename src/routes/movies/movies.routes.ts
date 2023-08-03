import { Router } from "express";
import { createMovie, deleteMovieById, getAllMovies, getMovieById, updateMovie } from "../../controller/movies/movie.controller";


const moviesRoutes: Router = Router();

moviesRoutes
            .get("/", getAllMovies)
            .get("/:movieId", getMovieById)
            .post("/:userId", createMovie)
            .delete("/:movieId", deleteMovieById)
            .put("/:movieId", updateMovie)

export default moviesRoutes;