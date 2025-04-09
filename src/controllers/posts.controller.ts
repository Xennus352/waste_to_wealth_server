import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

//Function to get all posts
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await prisma.post.findMany({
      include:{Like:true},
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

//Function to get single post
export const getSinglePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findFirst({ where: { id } });

    if (!post) {
      res.status(400).json({ message: "Not found!" });
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching post.",
      error: error,
    });
  }
};

// Function to create a new post
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      contentEnglish,
      contentBurmese,
      image,
      useful,
      isApproved,
      type,
    } = req.body;

    // Validate input
    if (!title || !type) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    // Ensure the user is authenticated
    const user = req.user as { id: string };
    if (!user || !user.id) {
      res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated." });
      return;
    }

    const rawProduct = {
      title,
      contentBurmese,
      contentEnglish,
      image,
      useful,
      isApproved,
      type,
      userId: user.id,
    };

    const post = await prisma.post.create({
      data: rawProduct,
    });

    res.status(201).json({ message: "Post created successfully.", post: post });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred on create post",
      error: error.message,
    });
  }
};

//Function to update post
export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      title,
      contentEnglish,
      contentBurmese,
      image,
      useful,
      isApproved,
      type,
    } = req.body;

    // Validate required field
    if (!id) {
      res.status(400).json({ message: "Post ID is required in the URL." });
      return;
    }
    const existingPost = await prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      res.status(404).json({ message: "Post not found." });
      return;
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        contentEnglish,
        contentBurmese,
        image,
        useful,
        isApproved,
        type,
      },
    });

    res
      .status(200)
      .json({ message: "Post updated successfully.", post: updatedPost });
  } catch (error: any) {
    res.status(500).json({
      message: "Error updating post.",
      error: error.message || error.toString(),
    });
  }
};

//Function to delete post
export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await prisma.post.delete({ where: { id } });

    if (!post) {
      res.status(400).json({ message: "Post not found!" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error while deleting post.", error: error.message });
  }
};
