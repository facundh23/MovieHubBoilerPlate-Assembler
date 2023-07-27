import express, {Express} from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user/user.routes';


const app:Express = express();

app.use(express.json());
app.use(morgan('dev'));

app.use("/user", userRoutes)


export default app;