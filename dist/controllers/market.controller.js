"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getSingleProduct = exports.getProducts = void 0;
const prisma_1 = require("../utils/prisma");
//Function to get all products
const getProducts = async (req, res) => {
    try {
        const products = await prisma_1.prisma.market.findMany({
            include: {
                User: true,
                Order: true,
            },
        });
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching products.",
            error: error.message,
        });
    }
};
exports.getProducts = getProducts;
//Function to get single product
const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma_1.prisma.market.findFirst({ where: { id } });
        if (!product) {
            res.status(400).json({ message: "Not found!" });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching product.",
            error: error,
        });
    }
};
exports.getSingleProduct = getSingleProduct;
// Function to create a new product
const createProduct = async (req, res) => {
    try {
        const { title, type, description, picture, price, quantity } = req.body;
        // Validate input
        if (!title || !type || !price || !quantity || !description) {
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
            type,
            description,
            picture,
            price,
            quantity,
            userId: user.id,
        };
        const post = await prisma_1.prisma.market.create({
            data: rawProduct,
        });
        res
            .status(201)
            .json({ message: "Product created successfully.", product: post });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred on create product",
            error: error.message,
        });
    }
};
exports.createProduct = createProduct;
//Function to update product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, quantity, picture, type, description } = req.body;
        // Validate required field
        if (!id) {
            res.status(400).json({ message: "Post ID is required in the URL." });
            return;
        }
        const existingProduct = await prisma_1.prisma.market.findUnique({ where: { id } });
        if (!existingProduct) {
            res.status(404).json({ message: "Product not found." });
            return;
        }
        const updatedProduct = await prisma_1.prisma.market.update({
            where: { id },
            data: {
                title,
                description,
                price,
                quantity,
                type,
                picture,
            },
        });
        res.status(200).json({
            message: "Product updated successfully.",
            product: updatedProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error updating product.",
            error: error.message || error.toString(),
        });
    }
};
exports.updateProduct = updateProduct;
//Function to delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma_1.prisma.market.delete({ where: { id } });
        if (!product) {
            res.status(400).json({ message: "Product not found!" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error while deleting product.", error: error.message });
    }
};
exports.deleteProduct = deleteProduct;
