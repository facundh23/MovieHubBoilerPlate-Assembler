import { Router } from "express";
import { signUp } from "../../controller/user/user.controller";

const authRouter = Router();

authRouter.post("/signup", signUp);

export default authRouter;
