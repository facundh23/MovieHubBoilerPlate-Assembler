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
  .post("/", checkJwtMiddleware, addGenre)
  .post("/generatorGenre", checkJwtMiddleware, generatorGenre)
  .delete("/:genreId", checkJwtMiddleware, deleteGenreById);

export default genreRoutes;
