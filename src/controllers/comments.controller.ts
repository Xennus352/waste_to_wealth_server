import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

// get comments
export const getComments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const comments = await prisma.comment.findMany({
      where: { postId: id },
      include: { User: true },
      orderBy: { updatedAt: "desc" },
    });

    res.status(200).json(comments);
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while fetching comments.",
      error: error.message,
    });
  }
};

// create comment
export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = (req as any).user?.id;

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: id,
        userId,
      },
    });

    res.status(200).json(comment);
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while fetching posts.",
      error: error.message,
    });
  }
};

// delete comment
export const deleteComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { updatedAt: "desc" },
    });

    res.status(200).json(posts);
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while fetching posts.",
      error: error.message,
    });
  }
};
