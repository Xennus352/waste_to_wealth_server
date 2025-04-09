import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

//Function to get all feedbacks
export const getFeedbacks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const feedbacks = await prisma.feedback.findMany();

    res.status(200).json(feedbacks);
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while fetching feedbacks.",
      error: error.message,
    });
  }
};

//Function to get single feedback
export const getSingleFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const feedback = await prisma.feedback.findFirst({ where: { id } });

    if (!feedback) {
      res.status(400).json({ message: "Not found!" });
      return;
    }

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching feedback.",
      error: error,
    });
  }
};

// Function to create a new feedback
export const createFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { content } = req.body;

    // Validate input
    if (!content) {
      res.status(400).json({ message: "Content is required." });
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

    const feedbackData = {
      userId: user.id,
      content,
    };

    const feedback = await prisma.feedback.create({ data: feedbackData });

    res
      .status(201)
      .json({ message: "Feedback created successfully.", feedback: feedback });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred on create feedback",
      error: error.message,
    });
  }
};

//Function to delete feedback
export const deleteFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const feedback = await prisma.feedback.delete({ where: { id } });

    if (!feedback) {
      res.status(400).json({ message: "Feedback not found!" });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error: any) {
    res.status(500).json({
      message: "Error while deleting feedback.",
      error: error.message,
    });
  }
};
