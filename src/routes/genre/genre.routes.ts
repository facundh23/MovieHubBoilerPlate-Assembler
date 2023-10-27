import { Router } from "express";
import {
  addGenre,
  showGenres,
  deleteGenreById,
  generatorGenre,
} from "../../controller/genre/genre.controller";
import { checkJwtMiddleware } from "../../middlewares/checkJwtmiddleware";

const genreRoutes: Router = Router();

genreRoutes
  .get("/", showGenres)
  .post("/", addGenre)
  .post("/generatorGenre", generatorGenre)
  .delete("/:genreId", deleteGenreById);

export default genreRoutes;
