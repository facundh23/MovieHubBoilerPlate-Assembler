import express, {Application} from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user/user.routes';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth/auth.routes'
import moviesRoutes from './routes/movies/movies.routes'

const app:Application = express();

app.set('PORT', process.env.PORT || 3000)

app.use(morgan('dev'));
dotenv.config()
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use("/",authRoutes)
app.use("/users", userRoutes)
app.use("/movies", moviesRoutes)


export default app;