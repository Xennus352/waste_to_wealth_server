"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeedback = exports.createFeedback = exports.getSingleFeedback = exports.getFeedbacks = void 0;
const prisma_1 = require("../utils/prisma");
//Function to get all feedbacks
const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await prisma_1.prisma.feedback.findMany({
            include: { User: true },
        });
        res.status(200).json(feedbacks);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching feedbacks.",
            error: error.message,
        });
    }
};
exports.getFeedbacks = getFeedbacks;
//Function to get single feedback
const getSingleFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await prisma_1.prisma.feedback.findFirst({ where: { id } });
        if (!feedback) {
            res.status(400).json({ message: "Not found!" });
            return;
        }
        res.status(200).json(feedback);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching feedback.",
            error: error,
        });
    }
};
exports.getSingleFeedback = getSingleFeedback;
// Function to create a new feedback
const createFeedback = async (req, res) => {
    try {
        const { content } = req.body;
        // Validate input
        if (!content) {
            res.status(400).json({ message: "Content is required." });
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
        const feedbackData = {
            userId: user.id,
            content,
        };
        const feedback = await prisma_1.prisma.feedback.create({ data: feedbackData });
        res
            .status(201)
            .json({ message: "Feedback created successfully.", feedback: feedback });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred on create feedback",
            error: error.message,
        });
    }
};
exports.createFeedback = createFeedback;
//Function to delete feedback
const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await prisma_1.prisma.feedback.delete({ where: { id } });
        if (!feedback) {
            res.status(400).json({ message: "Feedback not found!" });
        }
        res.status(200).json({ message: "Feedback deleted successfully" });
    }
    catch (error) {
        res.status(500).json({
            message: "Error while deleting feedback.",
            error: error.message,
        });
    }
};
exports.deleteFeedback = deleteFeedback;
