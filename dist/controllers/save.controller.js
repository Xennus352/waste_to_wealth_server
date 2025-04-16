"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSave = exports.getSaves = void 0;
const prisma_1 = require("../utils/prisma");
// get saves
const getSaves = async (req, res) => {
    const { id } = req.body;
    try {
        const saves = await prisma_1.prisma.save.findMany({
            where: { id },
            include: {
                Post: true,
                User: true,
            },
        });
        res.json({ saves });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching comments.",
            error: error.message,
        });
    }
};
exports.getSaves = getSaves;
// create save
const createSave = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user?.id;
        if (!userId || !postId) {
            res.status(400).json({ error: "userId and postId are required" });
            return;
        }
        // Check if already saved
        const existingSave = await prisma_1.prisma.save.findFirst({
            where: {
                userId,
                postId,
            },
        });
        if (existingSave) {
            await prisma_1.prisma.save.delete({
                where: {
                    id: existingSave.id,
                },
            });
            res.status(200).json({ message: "Like removed" });
            return;
        }
        const save = await prisma_1.prisma.save.create({
            data: {
                userId,
                postId,
            },
        });
        res.status(201).json(save);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching posts.",
            error: error.message,
        });
    }
};
exports.createSave = createSave;
