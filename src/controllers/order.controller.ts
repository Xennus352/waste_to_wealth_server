import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

//Function to get all orders
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await prisma.order.findMany();

    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while fetching orders.",
      error: error.message,
    });
  }
};

//Function to get single order
export const getSingleOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findFirst({ where: { id } });

    if (!order) {
      res.status(400).json({ message: "Not found!" });
      return;
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching order.",
      error: error,
    });
  }
};

// Function to create a new order
export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { marketId } = req.body;

    // Validate input
    if (!marketId) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const order = await prisma.order.create({
      data: marketId,
    });

    res
      .status(201)
      .json({ message: "Order created successfully.", order: order });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred on create order",
      error: error.message,
    });
  }
};

//Function to delete order
export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const order = await prisma.order.delete({ where: { id } });

    if (!order) {
      res.status(400).json({ message: "Order not found!" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error while deleting order.", error: error.message });
  }
};
