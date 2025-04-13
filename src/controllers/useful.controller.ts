import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

// get useful
export const getUseful = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;

  try {
    const useful = await prisma.useful.findMany({
      where: { id },
      include: {
        Post: true,
        User: true,
      },
    });

    res.json({ useful });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while fetching comments.",
      error: error.message,
    });
  }
};

// create useful
export const createUseful = async (
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

    // Check if already set
    const existingUseful = await prisma.useful.findFirst({
      where: {
        userId,
        postId,
      },
    });
    if (existingUseful) {
      await prisma.useful.delete({
        where: {
          id: existingUseful.id,
        },
      });
      res.status(200).json({ message: "Like removed" });
      return;
    }

    const useful = await prisma.useful.create({
      data: {
        userId,
        postId,
      },
    });

    res.status(201).json(useful);
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while fetching posts.",
      error: error.message,
    });
  }
};
