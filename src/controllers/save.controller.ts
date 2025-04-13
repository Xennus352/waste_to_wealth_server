import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

// get saves
export const getSaves = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;

  try {
    const saves = await prisma.save.findMany({
      where: { id },
      include: {
        Post: true,
        User: true,
      },
    });

    res.json({ saves });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while fetching comments.",
      error: error.message,
    });
  }
};

// create save
export const createSave = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.body;
    const userId = (req as any).user?.id;

    if (!userId || !postId) {
      res.status(400).json({ error: "userId and postId are required" });
      return;
    }

    // Check if already saved
    const existingSave = await prisma.save.findFirst({
      where: {
        userId,
        postId,
      },
    });
    if (existingSave) {
      await prisma.save.delete({
        where: {
          id: existingSave.id,
        },
      });
      res.status(200).json({ message: "Like removed" });
      return;
    }

    const save = await prisma.save.create({
      data: {
        userId,
        postId,
      },
    });

    res.status(201).json(save);
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while fetching posts.",
      error: error.message,
    });
  }
};
