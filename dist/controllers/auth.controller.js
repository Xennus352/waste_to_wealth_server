"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const prisma_1 = require("../utils/prisma");
const logout = async (req, res) => {
    try {
        // Retrieve session token from cookies
        const sessionToken = req.cookies.session_token;
        if (!sessionToken) {
            res.status(400).json({ message: "Session token is required." });
            return;
        }
        // Find the session by sessionToken
        const session = await prisma_1.prisma.session.findUnique({
            where: { sessionToken },
        });
        if (!session) {
            res.status(404).json({ message: "Session not found." });
            return;
        }
        // Delete the session from the database using its id
        await prisma_1.prisma.session.delete({
            where: { id: session.id },
        });
        // Clear the session token cookie
        res.clearCookie("session_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json({ message: "Logged out and session deleted." });
    }
    catch (error) {
        console.error("Logout error:", error); // Log the error for debugging
        res.status(500).json({ message: "Logout failed", error: error.message });
    }
};
exports.logout = logout;
