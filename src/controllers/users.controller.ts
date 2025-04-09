import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

//Function to get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({ orderBy: { updatedAt: 'desc' } });

    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while fetching users.",
      error: error.message,
    });
  }
};

//Function to get single user
export const getSingleUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) {
      res.status(400).json({ message: "Not found!" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching user.",
      error: error,
    });
  }
};

//Function to update user
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, PhoneNumber, address, ProfilePic, bio, role } =
      req.body;

    // Validate required field
    if (!id) {
      res.status(400).json({ message: "User ID is required in the URL." });
      return;
    }
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        PhoneNumber,
        address,
        ProfilePic,
        bio,
        role,
      },
    });

    res
      .status(200)
      .json({ message: "User updated successfully.", post: updatedUser });
  } catch (error: any) {
    res.status(500).json({
      message: "Error updating user.",
      error: error.message || error.toString(),
    });
  }
};

//Function to delete user
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await prisma.user.delete({ where: { id } });

    if (!user) {
      res.status(400).json({ message: "User not found!" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error while deleting User.", error: error.message });
  }
};

//Function to get current user
export const currentUser = async (req: Request, res: Response) => {
  try {
    const id = (req as any).user?.id;

    if (!id) {
      res.status(401).json({ message: "User not logged in." });
      return;
    }
    const currentUser = await prisma.user.findFirst({
      where: { id },
    });
    res.status(200).json({ message: "Current User.", user: currentUser });
  } catch (error) {
    res.status(404).json({ message: "User not login" });
  }
};
