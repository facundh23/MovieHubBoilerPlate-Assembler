import {Router} from 'express';
import { signIn, signUp } from "../../controller/User/user.controller";

const router = Router();
router.post('signup', signUp);
router.post('signin', signIn);