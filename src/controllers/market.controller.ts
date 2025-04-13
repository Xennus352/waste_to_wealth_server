import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

//Function to get all products
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await prisma.market.findMany({
      include: {
        User: true,
        Order: true,
      },
    });

    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while fetching products.",
      error: error.message,
    });
  }
};

//Function to get single product
export const getSingleProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await prisma.market.findFirst({ where: { id } });

    if (!product) {
      res.status(400).json({ message: "Not found!" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching product.",
      error: error,
    });
  }
};

// Function to create a new product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, type, description, picture, price, quantity } = req.body;

    // Validate input
    if (!title || !type || !price || !quantity || !description) {
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
      type,
      description,
      picture,
      price,
      quantity,
      userId: user.id,
    };
    const post = await prisma.market.create({
      data: rawProduct,
    });

    res
      .status(201)
      .json({ message: "Product created successfully.", product: post });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred on create product",
      error: error.message,
    });
  }
};

//Function to update product
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, price, quantity, picture, type, description } = req.body;

    // Validate required field
    if (!id) {
      res.status(400).json({ message: "Post ID is required in the URL." });
      return;
    }
    const existingProduct = await prisma.market.findUnique({ where: { id } });
    if (!existingProduct) {
      res.status(404).json({ message: "Product not found." });
      return;
    }

    const updatedProduct = await prisma.market.update({
      where: { id },
      data: {
        title,
        description,
        price,
        quantity,
        type,
        picture,
      },
    });

    res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error updating product.",
      error: error.message || error.toString(),
    });
  }
};

//Function to delete product
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await prisma.market.delete({ where: { id } });

    if (!product) {
      res.status(400).json({ message: "Product not found!" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error while deleting product.", error: error.message });
  }
};
