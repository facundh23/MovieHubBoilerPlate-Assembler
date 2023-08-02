import { Router } from "express";
import { createMovie } from "../../controller/Movies/movie.controller";


const moviesRoutes: Router = Router();

moviesRoutes
            .post("/:userId", createMovie);

export default moviesRoutes;