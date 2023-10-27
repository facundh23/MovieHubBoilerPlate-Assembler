import { Response, Request } from "express";
import { prismaClient } from "../../db/clientPrisma";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req.body;

  const existingEmail = await prismaClient.user.findUnique({
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
      const newUser = await prismaClient.user.create({
        data: {
          name: name,
          email: email,
        },
      });

      res.status(200).json(newUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allUsers = await prismaClient.user.findMany({
      include: {
        movies: {
          select: {
            title: true,
          },
        },
      },
    });
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = req.params;
  try {
    const user = await prismaClient.user.findUnique({
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
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name } = req.body;
  const { email } = req.params;

  try {
    const updatedUser = await prismaClient.user.update({
      where: {
        email: email,
      },
      data: {
        name,
      },
    });
    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = req.params;
  try {
    await prismaClient.user.delete({
      where: {
        id: userId,
      },
    });
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json(error);
  }
};
