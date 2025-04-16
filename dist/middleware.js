"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateSession = void 0;
const prisma_1 = require("./utils/prisma");
const authenticateSession = async (req, res, next) => {
    try {
        const sessionToken = req.cookies.session_token;
        if (!sessionToken) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // Find the session in the database
        const session = await prisma_1.prisma.session.findUnique({
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
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred", error: error.message });
    }
};
exports.authenticateSession = authenticateSession;
