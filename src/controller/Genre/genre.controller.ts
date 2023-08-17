import { Request, Response } from "express";
import { prismaClient } from "../../db/clientPrisma";

export const addGenre = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name } = req.body;

  if (!req.body.name) {
    return res.status(400).json({ msg: "This field is required" });
  }

  try {
    const genre = await prismaClient.genres.create({
      data: {
        name,
      },
    });
    return res.status(201).send(genre);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const generatorGenre = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name } = req.body;

  try {
    const genre = await prismaClient.genres.create({
      data: {
        name,
      },
    });
    return res.status(201).json(genre);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const showGenres = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allGenres = await prismaClient.genres.findMany();
    return res.status(200).json(allGenres);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteGenreById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { genreId } = req.params;

  try {
    await prismaClient.genres.delete({ where: { id: genreId } });
    return res.status(200).send({ msg: "Genre deleted", data: genreId });
  } catch (error) {
    return res.status(500).send(error);
  }
};
