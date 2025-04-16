"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getSinglePost = exports.getPosts = void 0;
const prisma_1 = require("../utils/prisma");
//Function to get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await prisma_1.prisma.post.findMany({
            include: { Like: true, User: true, Save: true, Useful: true },
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
exports.getPosts = getPosts;
//Function to get single post
const getSinglePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma_1.prisma.post.findFirst({
            where: { id },
            include: {
                User: true,
            },
        });
        if (!post) {
            res.status(400).json({ message: "Not found!" });
            return;
        }
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching post.",
            error: error,
        });
    }
};
exports.getSinglePost = getSinglePost;
// Function to create a new post
const createPost = async (req, res) => {
    try {
        const { title, contentEnglish, contentBurmese, image, isApproved, type } = req.body;
        // Validate input
        if (!title || !type) {
            res.status(400).json({ message: "All fields are required." });
            return;
        }
        // Ensure the user is authenticated
        const user = req.user;
        if (!user || !user.id) {
            res
                .status(401)
                .json({ message: "Unauthorized: User not authenticated." });
            return;
        }
        const rawProduct = {
            title,
            contentBurmese,
            contentEnglish,
            image,
            isApproved,
            type,
            userId: user.id,
        };
        const post = await prisma_1.prisma.post.create({
            data: rawProduct,
        });
        res.status(201).json({ message: "Post created successfully.", post: post });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred on create post",
            error: error.message,
        });
    }
};
exports.createPost = createPost;
//Function to update post
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, contentEnglish, contentBurmese, image, isApproved, type } = req.body;
        console.log(id);
        // Validate required field
        if (!id) {
            res.status(400).json({ message: "Post ID is required in the URL." });
            return;
        }
        const existingPost = await prisma_1.prisma.post.findUnique({ where: { id } });
        if (!existingPost) {
            res.status(404).json({ message: "Post not found." });
            return;
        }
        const updatedPost = await prisma_1.prisma.post.update({
            where: { id },
            data: {
                title,
                contentEnglish,
                contentBurmese,
                image,
                isApproved,
                type,
            },
        });
        res
            .status(200)
            .json({ message: "Post updated successfully.", post: updatedPost });
    }
    catch (error) {
        res.status(500).json({
            message: "Error updating post.",
            error: error.message || error.toString(),
        });
    }
};
exports.updatePost = updatePost;
//Function to delete post
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma_1.prisma.post.delete({ where: { id } });
        if (!post) {
            res.status(400).json({ message: "Post not found!" });
        }
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error while deleting post.", error: error.message });
    }
};
exports.deletePost = deletePost;
