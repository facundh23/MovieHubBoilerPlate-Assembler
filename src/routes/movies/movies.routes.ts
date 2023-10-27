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
  .post("/movies/:userID", createMovie)
  .delete("/movies/:movieId", deleteMovieById)
  .put("/movies/edit/:movieId", updateMovie);

export default moviesRoutes;
