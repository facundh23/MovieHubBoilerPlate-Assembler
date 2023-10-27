import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  signUp,
  updateUser,
} from "../../controller/user/user.controller";
import { checkJwtMiddleware } from "../../middlewares/checkJwtmiddleware";

const userRoutes: Router = Router();

userRoutes
  .get("/", getAllUsers)
  .get("/:userId", getUserById)
  .put("/:email", updateUser)
  .delete("/:userId", checkJwtMiddleware, deleteUser)
  .post("/", signUp);

export default userRoutes;
