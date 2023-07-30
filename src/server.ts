import express, {Application} from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user/user.routes';
import cors from 'cors';
import dotenv from 'dotenv';


const app:Application = express();

app.set('PORT', process.env.PORT || 3000)

app.use(express.json());
app.use(morgan('dev'));
dotenv.config()
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use("/user", userRoutes)


export default app;