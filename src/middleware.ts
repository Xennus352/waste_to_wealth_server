import { Request, Response, NextFunction } from "express";
import { prisma } from "./utils/prisma";

export const authenticateSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const sessionToken = req.cookies.session_token;

    if (!sessionToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Find the session in the database
    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    });

    if (!session) {
      res.status(401).json({ message: "Invalid session" });
      return;
    }

    // Attach user to the request object
    req.user = session.user;
    next();
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
