import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../../controller/User/user.controller";

const userRoutes:Router = Router();

userRoutes
    .get("/",getAllUsers)
    .get("/:userId", getUserById)
    .post("/", createUser)
    .put("/:userId", updateUser)
    .delete("/:userId", deleteUser)




export default userRoutes