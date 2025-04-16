"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUseful = exports.getUseful = void 0;
const prisma_1 = require("../utils/prisma");
// get useful
const getUseful = async (req, res) => {
    const { id } = req.body;
    try {
        const useful = await prisma_1.prisma.useful.findMany({
            where: { id },
            include: {
                Post: true,
                User: true,
            },
        });
        res.json({ useful });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching comments.",
            error: error.message,
        });
    }
};
exports.getUseful = getUseful;
// create useful
const createUseful = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user?.id;
        if (!userId || !postId) {
            res.status(400).json({ error: "userId and postId are required" });
            return;
        }
        // Check if already set
        const existingUseful = await prisma_1.prisma.useful.findFirst({
            where: {
                userId,
                postId,
            },
        });
        if (existingUseful) {
            await prisma_1.prisma.useful.delete({
                where: {
                    id: existingUseful.id,
                },
            });
            res.status(200).json({ message: "Like removed" });
            return;
        }
        const useful = await prisma_1.prisma.useful.create({
            data: {
                userId,
                postId,
            },
        });
        res.status(201).json(useful);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching posts.",
            error: error.message,
        });
    }
};
exports.createUseful = createUseful;
