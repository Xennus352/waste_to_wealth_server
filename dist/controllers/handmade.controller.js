"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHandmade = exports.updateHandmade = exports.createHandmade = exports.getSingleHandmade = exports.getHandmades = void 0;
const prisma_1 = require("../utils/prisma");
//Function to get all handmades
const getHandmades = async (req, res) => {
    try {
        const handmades = await prisma_1.prisma.handmade.findMany({
            include: {
                User: true,
            },
        });
        res.status(200).json({ handmades: handmades });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching handmades.",
            error: error.message,
        });
    }
};
exports.getHandmades = getHandmades;
//Function to get single handmade
const getSingleHandmade = async (req, res) => {
    try {
        const { id } = req.params;
        const handmade = await prisma_1.prisma.handmade.findFirst({ where: { id } });
        if (!handmade) {
            res.status(400).json({ message: "Not found!" });
            return;
        }
        res.status(200).json(handmade);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching handmade.",
            error: error,
        });
    }
};
exports.getSingleHandmade = getSingleHandmade;
// Function to create a new handmade
const createHandmade = async (req, res) => {
    try {
        const id = req.user?.id;
        const { title, descriptionEng, descriptionMyan, picture } = req.body;
        // Validate input
        if (!title || !descriptionEng || !descriptionMyan) {
            res.status(400).json({ message: "All fields are required." });
            return;
        }
        const handmade = await prisma_1.prisma.handmade.create({
            data: {
                userId: id,
                title,
                descriptionEng,
                descriptionMyan,
                picture,
            },
        });
        res
            .status(201)
            .json({ message: "Handmade created successfully.", handmade: handmade });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred on create handmade",
            error: error.message,
        });
    }
};
exports.createHandmade = createHandmade;
//Function to update handmade
const updateHandmade = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, descriptionEng, descriptionMyan, picture } = req.body;
        // Validate required field
        if (!id) {
            res.status(400).json({ message: "Post ID is required in the URL." });
            return;
        }
        const existingHandmade = await prisma_1.prisma.handmade.findUnique({
            where: { id },
        });
        if (!existingHandmade) {
            res.status(404).json({ message: "Handmade not found." });
            return;
        }
        const handmade = { title, descriptionEng, descriptionMyan, picture };
        const updatedHandmade = await prisma_1.prisma.handmade.update({
            where: { id },
            data: handmade,
        });
        res.status(200).json({
            message: "Product updated successfully.",
            handmade: updatedHandmade,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error updating product.",
            error: error.message || error.toString(),
        });
    }
};
exports.updateHandmade = updateHandmade;
//Function to delete handmade
const deleteHandmade = async (req, res) => {
    try {
        const { id } = req.params;
        const Handmade = await prisma_1.prisma.handmade.delete({ where: { id } });
        if (!Handmade) {
            res.status(400).json({ message: "Handmade not found!" });
        }
        res.status(200).json({ message: "Handmade deleted successfully" });
    }
    catch (error) {
        res.status(500).json({
            message: "Error while deleting handmade.",
            error: error.message,
        });
    }
};
exports.deleteHandmade = deleteHandmade;
