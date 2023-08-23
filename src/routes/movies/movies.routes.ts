import { Router } from "express";
import {
  deleteMovieById,
  getAllMovies,
  getMovieById,
  updateMovie,
  newMovie,
  publicMovies,
} from "../../controller/movies/movie.controller";
import { checkJwtMiddleware } from "../../middlewares/checkJwtmiddleware";

const moviesRoutes: Router = Router();

moviesRoutes
  .get("/public", publicMovies)
  .get("/", checkJwtMiddleware, getAllMovies)

  .post("/", checkJwtMiddleware, newMovie)
  .delete("/:movieId", checkJwtMiddleware, deleteMovieById)
  .put("/:movieId", checkJwtMiddleware, updateMovie);

export default moviesRoutes;
