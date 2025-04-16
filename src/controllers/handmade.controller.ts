import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

//Function to get all handmades
export const getHandmades = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const handmades = await prisma.handmade.findMany({
      include: {
        User: true,
      },
    });

    res.status(200).json({ handmades: handmades });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while fetching handmades.",
      error: error.message,
    });
  }
};

//Function to get single handmade
export const getSingleHandmade = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const handmade = await prisma.handmade.findFirst({ where: { id } });

    if (!handmade) {
      res.status(400).json({ message: "Not found!" });
      return;
    }

    res.status(200).json(handmade);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching handmade.",
      error: error,
    });
  }
};

// Function to create a new handmade
export const createHandmade = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = (req as any).user?.id;
    const { title, descriptionEng, descriptionMyan, picture } = req.body;

    // Validate input
    if (!title || !descriptionEng || !descriptionMyan) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const handmade = await prisma.handmade.create({
      data: {
        userId: id,
        title,
        descriptionEng,
        descriptionMyan,
        picture,
      },
    });

    res
      .status(201)
      .json({ message: "Handmade created successfully.", handmade: handmade });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred on create handmade",
      error: error.message,
    });
  }
};

//Function to update handmade
export const updateHandmade = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, descriptionEng, descriptionMyan, picture } = req.body;

    // Validate required field
    if (!id) {
      res.status(400).json({ message: "Post ID is required in the URL." });
      return;
    }
    const existingHandmade = await prisma.handmade.findUnique({
      where: { id },
    });
    if (!existingHandmade) {
      res.status(404).json({ message: "Handmade not found." });
      return;
    }
    const handmade = { title, descriptionEng, descriptionMyan, picture };
    const updatedHandmade = await prisma.handmade.update({
      where: { id },
      data: handmade,
    });

    res.status(200).json({
      message: "Product updated successfully.",
      handmade: updatedHandmade,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error updating product.",
      error: error.message || error.toString(),
    });
  }
};

//Function to delete handmade
export const deleteHandmade = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const Handmade = await prisma.handmade.delete({ where: { id } });

    if (!Handmade) {
      res.status(400).json({ message: "Handmade not found!" });
    }

    res.status(200).json({ message: "Handmade deleted successfully" });
  } catch (error: any) {
    res.status(500).json({
      message: "Error while deleting handmade.",
      error: error.message,
    });
  }
};
