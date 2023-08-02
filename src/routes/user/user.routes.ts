import { Router } from "express";
import {  deleteUser, getAllUsers, getUserById, updateUser } from "../../controller/User/user.controller";

const userRoutes:Router = Router();

userRoutes
    .get("/",getAllUsers)
    .get("/:userId", getUserById)
    .put("/:userId", updateUser)
    .delete("/:userId", deleteUser)

export default userRoutes