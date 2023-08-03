import { Router } from "express";
import { addGenre, showGenres, deleteGenreById } from "../../controller/genre/genre.controller";

const genreRoutes:Router = Router();

genreRoutes
    .get("/", showGenres)
    .post("/",addGenre)
    .delete("/:genreId", deleteGenreById)

export default genreRoutes