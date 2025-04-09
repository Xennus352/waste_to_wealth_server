import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // Retrieve session token from cookies
    const sessionToken = req.cookies.session_token;

    if (!sessionToken) {
      res.status(400).json({ message: "Session token is required." });
      return;
    }

    // Find the session by sessionToken
    const session = await prisma.session.findUnique({
      where: { sessionToken },
    });

    if (!session) {
      res.status(404).json({ message: "Session not found." });
      return;
    }

    // Delete the session from the database using its id
    await prisma.session.delete({
      where: { id: session.id },
    });

    // Clear the session token cookie
    res.clearCookie("session_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out and session deleted." });
  } catch (error: any) {
    console.error("Logout error:", error); // Log the error for debugging
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};
