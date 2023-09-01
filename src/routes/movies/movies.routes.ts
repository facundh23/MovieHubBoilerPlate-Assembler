import { Router } from "express";
import {
  deleteMovieById,
  getAllMovies,
  getMovieById,
  updateMovie,
  createMovie,
} from "../../controller/movies/movie.controller";
import { checkJwtMiddleware } from "../../middlewares/checkJwtmiddleware";

const moviesRoutes: Router = Router();

moviesRoutes

  .get("/", getAllMovies)
  .get("/movies/movie/:movieId", getMovieById)
  .post("/movies/:userId", checkJwtMiddleware, createMovie)
  .delete("/movies/:movieId", checkJwtMiddleware, deleteMovieById)
  .put("/movies/edit/:movieId", updateMovie);

export default moviesRoutes;
