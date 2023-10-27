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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovieById = exports.updateMovie = exports.getMovieById = exports.getAllMovies = exports.createMovie = void 0;
const clientPrisma_1 = require("../../db/clientPrisma");
const cloudinary_1 = require("../../utils/cloudinary");
const fs_extra_1 = __importDefault(require("fs-extra"));
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, sinopsis } = req.body;
    const { userID } = req.params;
    let { year } = req.body;
    let { score } = req.body;
    let { genres } = req.body;
    if (typeof year === "string") {
        year = parseInt(year);
    }
    if (typeof score === "string") {
        score = parseInt(score);
    }
    let arrGenres;
    if (typeof genres === "string") {
        arrGenres = genres.split(",");
    }
    if (!req.files || !req.files.poster_image) {
        return res.status(400).send("Image is required");
    }
    const image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.poster_image;
    let dbImage = null;
    if (image) {
        if ("tempFilePath" in image) {
            dbImage = yield (0, cloudinary_1.uploadImage)(image.tempFilePath);
            yield fs_extra_1.default.unlink(image === null || image === void 0 ? void 0 : image.tempFilePath);
        }
    }
    try {
        const newMovie = yield clientPrisma_1.prismaClient.movies.create({
            data: {
                title,
                poster_image: dbImage === null || dbImage === void 0 ? void 0 : dbImage.secure_url,
                poster_image_id: dbImage === null || dbImage === void 0 ? void 0 : dbImage.public_id,
                year,
                sinopsis,
                genres: {
                    connect: arrGenres === null || arrGenres === void 0 ? void 0 : arrGenres.map((genreId) => ({ id: genreId })),
                },
                score,
                User: {
                    connect: {
                        email: userID,
                    },
                },
            },
            include: {
                genres: {
                    select: { name: true },
                },
            },
        });
        return res.status(201).send(newMovie);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.createMovie = createMovie;
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMovies = yield clientPrisma_1.prismaClient.movies.findMany({
            include: {
                genres: true,
                User: true,
            },
        });
        return res.status(200).json(allMovies);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getAllMovies = getAllMovies;
const getMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    try {
        const genreMovie = yield clientPrisma_1.prismaClient.movies.findUnique({
            where: {
                id: movieId,
            },
        });
        return res.status(201).json(genreMovie);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getMovieById = getMovieById;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    const { title, score, year, sinopsis } = req.body;
    try {
        const updatedMovie = yield clientPrisma_1.prismaClient.movies.updateMany({
            where: {
                id: movieId,
            },
            data: {
                title,
                sinopsis,
                score: Number(score),
                year: Number(year),
            },
        });
        return res.status(200).json(updatedMovie);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.updateMovie = updateMovie;
const deleteMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    try {
        yield clientPrisma_1.prismaClient.movies.delete({
            where: {
                id: movieId,
            },
        });
        return res
            .status(200)
            .send({ msg: "Movie deleted Protected Route", data: movieId });
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.deleteMovieById = deleteMovieById;
