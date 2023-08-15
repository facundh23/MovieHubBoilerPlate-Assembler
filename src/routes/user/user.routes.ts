import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../../controller/user/user.controller";
import { checkJwtMiddleware } from "../../middlewares/checkJwtmiddleware";

const userRoutes: Router = Router();

userRoutes
  .get("/", getAllUsers)
  .get("/:userId", checkJwtMiddleware, getUserById)
  .put("/:userId", checkJwtMiddleware, updateUser)
  .delete("/:userId", checkJwtMiddleware, deleteUser);

export default userRoutes;
