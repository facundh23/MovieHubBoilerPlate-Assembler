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
import { protectedRequest } from "../../controller/request/request.controller";

const moviesRoutes: Router = Router();

moviesRoutes
  .get("/public", publicMovies)
  .get("/", checkJwtMiddleware, getAllMovies)
  .get("/protected", checkJwtMiddleware, protectedRequest)
  .post("/:userId", checkJwtMiddleware, newMovie)
  .delete("/:movieId", checkJwtMiddleware, deleteMovieById)
  .put("/:movieId", checkJwtMiddleware, updateMovie);

export default moviesRoutes;
