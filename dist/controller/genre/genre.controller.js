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
exports.deleteGenreById = exports.showGenres = exports.generatorGenre = exports.addGenre = void 0;
const clientPrisma_1 = require("../../db/clientPrisma");
const addGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!req.body.name) {
        return res.status(400).json({ msg: "This field is required" });
    }
    try {
        const genre = yield clientPrisma_1.prismaClient.genres.create({
            data: {
                name,
            },
        });
        return res.status(201).send(genre);
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.addGenre = addGenre;
const generatorGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const genre = yield clientPrisma_1.prismaClient.genres.create({
            data: {
                name,
            },
        });
        return res.status(201).json(genre);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.generatorGenre = generatorGenre;
const showGenres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allGenres = yield clientPrisma_1.prismaClient.genres.findMany();
        return res.status(200).json(allGenres);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.showGenres = showGenres;
const deleteGenreById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { genreId } = req.params;
    try {
        yield clientPrisma_1.prismaClient.genres.delete({ where: { id: genreId } });
        return res.status(200).send({ msg: "Genre deleted", data: genreId });
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.deleteGenreById = deleteGenreById;
