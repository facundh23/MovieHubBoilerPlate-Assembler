import { Request, Response } from "express";

import prisma from "../../db/clientPrisma";
import { uploadImage } from "../../utils/cloudinary";
import fs from "fs-extra";

export const newMovie = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { title, genres } = req.body;
  const { userId } = req.params;

  let secure_url_image = "";
  let public_id_image = "";
  let { year } = req.body;
  if (typeof year === "string") {
    year = parseInt(year);
  }

  let { score } = req.body;
  if (typeof score === "string") {
    score = parseInt(score);
  }

  if (!req.files || !req.files.poster_image) {
    return res.status(400).send("Image is required");
  }

  try {
    const image = req.files?.poster_image;
    if (image) {
      if ("tempFilePath" in image) {
        try {
          const poster_image = await uploadImage(image.tempFilePath);
          secure_url_image = poster_image.secure_url;
          public_id_image = poster_image.public_id;
          await fs.unlink(image?.tempFilePath);
        } catch (error) {
          return res.status(500).json({ error: "Upload error" });
        }
      }
    }
    const newMovie = await prisma.movies.create({
      data: {
        title,
        poster_image: {
          create: {
            public_id: public_id_image,
            secure_url: secure_url_image,
          },
        },
        year,
        genres: {
          connect: genres.map((genre: string) => ({ id: genre })),
        },
        score,
        User: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        genres: {
          select: { name: true },
        },
        poster_image: {
          select: { secure_url: true },
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
    const allMovies = await prisma.movies.findMany({
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
    const genreMovie = await prisma.movies.findUnique({
      where: {
        id: movieId,
      },
      include: {
        genres: true,
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
  const { title } = req.body;

  try {
    const updatedMovie = await prisma.movies.update({
      where: {
        id: movieId,
      },
      data: {
        title,
      },
    });
    return res.status(200).send(updatedMovie);
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
    await prisma.movies.delete({
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
export const publicMovies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    return res.status(200).send({ msg: "Public request movies" });
  } catch (error) {
    return res.status(500).send(error);
  }
};
