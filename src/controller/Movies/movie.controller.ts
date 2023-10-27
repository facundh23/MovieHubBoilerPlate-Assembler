import { Request, Response } from "express";

import { prismaClient } from "../../db/clientPrisma";
import { uploadImage } from "../../utils/cloudinary";
import fs from "fs-extra";

export const createMovie = async (
  req: Request,
  res: Response
): Promise<Response> => {
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

  const image = req.files?.poster_image;
  let dbImage = null;

  if (image) {
    if ("tempFilePath" in image) {
      dbImage = await uploadImage(image.tempFilePath);
      await fs.unlink(image?.tempFilePath);
    }
  }
  try {
    const newMovie = await prismaClient.movies.create({
      data: {
        title,
        poster_image: dbImage?.secure_url,
        poster_image_id: dbImage?.public_id,
        year,
        sinopsis,
        genres: {
          connect: arrGenres?.map((genreId: string) => ({ id: genreId })),
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
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getAllMovies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allMovies = await prismaClient.movies.findMany({
      include: {
        genres: true,
        User: true,
      },
    });
    return res.status(200).json(allMovies);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getMovieById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { movieId } = req.params;
  try {
    const genreMovie = await prismaClient.movies.findUnique({
      where: {
        id: movieId,
      },
    });
    return res.status(201).json(genreMovie);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateMovie = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { movieId } = req.params;
  const { title, score, year, sinopsis } = req.body;

  try {
    const updatedMovie = await prismaClient.movies.updateMany({
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
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteMovieById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { movieId } = req.params;

  try {
    await prismaClient.movies.delete({
      where: {
        id: movieId,
      },
    });
    return res
      .status(200)
      .send({ msg: "Movie deleted Protected Route", data: movieId });
  } catch (error) {
    return res.status(500).send(error);
  }
};
