"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.signUp = void 0;
const clientPrisma_1 = require("../../db/clientPrisma");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    const existingEmail = yield clientPrisma_1.prismaClient.user.findUnique({
        where: { email: email },
    });
    try {
        if (!name || !email) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }
        if (existingEmail) {
            res.status(200).json({ msg: "Email already exists" });
            return;
        }
        if (!existingEmail) {
            const newUser = yield clientPrisma_1.prismaClient.user.create({
                data: {
                    name: name,
                    email: email,
                },
            });
            res.status(200).json(newUser);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
});
exports.signUp = signUp;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield clientPrisma_1.prismaClient.user.findMany({
            include: {
                movies: {
                    select: {
                        title: true,
                    },
                },
            },
        });
        return res.status(200).json(allUsers);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield clientPrisma_1.prismaClient.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                movies: {
                    include: {
                        genres: {
                            select: { name: true },
                        },
                    },
                },
            },
        });
        return res.status(201).send(user);
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const { email } = req.params;
    try {
        const updatedUser = yield clientPrisma_1.prismaClient.user.update({
            where: {
                email: email,
            },
            data: {
                name,
            },
        });
        return res.status(200).send(updatedUser);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        yield clientPrisma_1.prismaClient.user.delete({
            where: {
                id: userId,
            },
        });
        return res.status(204).json();
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.deleteUser = deleteUser;
