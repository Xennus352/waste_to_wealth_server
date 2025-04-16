"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.createComment = exports.getComments = void 0;
const prisma_1 = require("../utils/prisma");
// get comments
const getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await prisma_1.prisma.comment.findMany({
            where: { postId: id },
            include: { User: true },
            orderBy: { updatedAt: "desc" },
        });
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching comments.",
            error: error.message,
        });
    }
};
exports.getComments = getComments;
// create comment
const createComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.user?.id;
        const comment = await prisma_1.prisma.comment.create({
            data: {
                content,
                postId: id,
                userId,
            },
        });
        res.status(200).json(comment);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching posts.",
            error: error.message,
        });
    }
};
exports.createComment = createComment;
// delete comment
const deleteComment = async (req, res) => {
    try {
        const posts = await prisma_1.prisma.post.findMany({
            orderBy: { updatedAt: "desc" },
        });
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching posts.",
            error: error.message,
        });
    }
};
exports.deleteComment = deleteComment;
