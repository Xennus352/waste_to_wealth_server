"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.createOrder = exports.getSingleOrder = exports.getOrders = void 0;
const prisma_1 = require("../utils/prisma");
//Function to get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await prisma_1.prisma.order.findMany({
            include: { User: true, Market: true },
        });
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching orders.",
            error: error.message,
        });
    }
};
exports.getOrders = getOrders;
//Function to get single order
const getSingleOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await prisma_1.prisma.order.findFirst({ where: { id } });
        if (!order) {
            res.status(400).json({ message: "Not found!" });
            return;
        }
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching order.",
            error: error,
        });
    }
};
exports.getSingleOrder = getSingleOrder;
// Function to create a new order
const createOrder = async (req, res) => {
    try {
        const { productOwnerName, productOwnerPhone, productOwnerAddress, userId, name, buyerPhone, buyerAddress, quantity, price, cashTransferPhoto, marketId, } = req.body;
        // Validate input
        if (!marketId) {
            res.status(400).json({ message: "Market id is required." });
            return;
        }
        // Check if already saved
        const existingSave = await prisma_1.prisma.order.findFirst({
            where: {
                userId,
                marketId,
            },
        });
        if (existingSave) {
            await prisma_1.prisma.order.delete({
                where: {
                    id: existingSave.id,
                },
            });
            res.status(200).json({ message: "Order cancled" });
            return;
        }
        const order = await prisma_1.prisma.order.create({
            data: {
                productOwnerName,
                productOwnerPhone,
                productOwnerAddress,
                userId,
                name,
                buyerPhone,
                buyerAddress,
                quantity,
                price,
                cashTransferPhoto,
                marketId,
            },
        });
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching posts.",
            error: error.message,
        });
    }
};
exports.createOrder = createOrder;
//Function to delete order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await prisma_1.prisma.order.delete({ where: { id } });
        if (!order) {
            res.status(400).json({ message: "Order not found!" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error while deleting order.", error: error.message });
    }
};
exports.deleteOrder = deleteOrder;
