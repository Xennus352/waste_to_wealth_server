"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLike = exports.getLikes = void 0;
const prisma_1 = require("../utils/prisma");
// get likes
const getLikes = async (req, res) => {
    const { id } = req.body;
    try {
        const likes = await prisma_1.prisma.like.findMany({
            where: { id },
            include: {
                Post: true,
                User: true,
            },
        });
        res.json({ likes });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching comments.",
            error: error.message,
        });
    }
};
exports.getLikes = getLikes;
// create like
const createLike = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user?.id;
        if (!userId || !postId) {
            res.status(400).json({ error: "userId and postId are required" });
            return;
        }
        // Check if already liked
        const existingLike = await prisma_1.prisma.like.findFirst({
            where: {
                userId,
                postId,
            },
        });
        if (existingLike) {
            await prisma_1.prisma.like.delete({
                where: {
                    id: existingLike.id,
                },
            });
            res.status(200).json({ message: "Like removed" });
            return;
        }
        const like = await prisma_1.prisma.like.create({
            data: {
                userId,
                postId,
            },
        });
        res.status(201).json(like);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching posts.",
            error: error.message,
        });
    }
};
exports.createLike = createLike;
