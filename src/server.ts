import express, { Application } from "express";
import morgan from "morgan";
import userRoutes from "./routes/user/user.routes";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth/auth.routes";
import moviesRoutes from "./routes/movies/movies.routes";
import genreRoutes from "./routes/genre/genre.routes";
import fileUpload from "express-fileupload";
import { checkJwtMiddleware } from "./middlewares/checkJwtmiddleware";

const app: Application = express();

app.set("PORT", process.env.PORT || 3000);

app.use(morgan("dev"));
dotenv.config();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/home", moviesRoutes);
app.use("/genres", checkJwtMiddleware, genreRoutes);

export default app;
