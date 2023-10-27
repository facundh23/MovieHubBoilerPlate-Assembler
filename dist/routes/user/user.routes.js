"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../controller/user/user.controller");
const checkJwtmiddleware_1 = require("../../middlewares/checkJwtmiddleware");
const userRoutes = (0, express_1.Router)();
userRoutes
    .get("/", user_controller_1.getAllUsers)
    .get("/:userId", user_controller_1.getUserById)
    .put("/:email", user_controller_1.updateUser)
    .delete("/:userId", checkJwtmiddleware_1.checkJwtMiddleware, user_controller_1.deleteUser)
    .post("/", user_controller_1.signUp);
exports.default = userRoutes;
