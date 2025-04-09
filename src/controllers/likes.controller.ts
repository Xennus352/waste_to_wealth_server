import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

// get likes
export const getLikes = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;

  try {
    const likes = await prisma.post.findMany({
      where: { id }, 
      include: {
        Like: {
          include: {
            User: true,
          },
        },
      },
    });

    res.json({ likes });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while fetching comments.",
      error: error.message,
    });
  }
};

// create like
export const createLike = async (
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

    // Check if already liked
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        postId,
      },
    });
    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      res.status(200).json({ message: "Like removed" });
      return;
    }

    const like = await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });

    res.status(201).json(like);
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while fetching posts.",
      error: error.message,
    });
  }
};
