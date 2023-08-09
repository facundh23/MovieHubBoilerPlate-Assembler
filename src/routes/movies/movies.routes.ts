import { Router } from "express";
import { deleteMovieById, getAllMovies, getMovieById, updateMovie, newMovie } from "../../controller/movies/movie.controller";
import { checkFieldsMovie } from "../../middlewares/checkFields.middleware";



const moviesRoutes: Router = Router();

moviesRoutes
            .get("/", getAllMovies)
            .get("/:movieId", getMovieById)
            .post("/:userId", checkFieldsMovie, newMovie)
            .delete("/:movieId", deleteMovieById)
            .put("/:movieId", updateMovie)

export default moviesRoutes;