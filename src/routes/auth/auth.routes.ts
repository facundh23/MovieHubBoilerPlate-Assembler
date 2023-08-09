import {Router} from 'express';
import { signIn, signUp } from "../../controller/user/user.controller";
import { checkFieldsUser } from '../../middlewares/checkFields.middleware';

const authRouter = Router();

authRouter.post('/signup', checkFieldsUser, signUp);
authRouter.post('/signin', signIn);

export default authRouter