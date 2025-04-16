"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getUsers = void 0;
const prisma_1 = require("../utils/prisma");
//Function to get all users
const getUsers = async (req, res) => {
    try {
        const users = await prisma_1.prisma.user.findMany({ orderBy: { updatedAt: 'desc' } });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching users.",
            error: error.message,
        });
    }
};
exports.getUsers = getUsers;
//Function to get single user
const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma_1.prisma.user.findFirst({ where: { id } });
        if (!user) {
            res.status(400).json({ message: "Not found!" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching user.",
            error: error,
        });
    }
};
exports.getSingleUser = getSingleUser;
//Function to update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, PhoneNumber, address, ProfilePic, bio, role } = req.body;
        // Validate required field
        if (!id) {
            res.status(400).json({ message: "User ID is required in the URL." });
            return;
        }
        const existingUser = await prisma_1.prisma.user.findUnique({ where: { id } });
        if (!existingUser) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        const updatedUser = await prisma_1.prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                PhoneNumber,
                address,
                ProfilePic,
                bio,
                role,
            },
        });
        res
            .status(200)
            .json({ message: "User updated successfully.", post: updatedUser });
    }
    catch (error) {
        res.status(500).json({
            message: "Error updating user.",
            error: error.message || error.toString(),
        });
    }
};
exports.updateUser = updateUser;
//Function to delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma_1.prisma.user.delete({ where: { id } });
        if (!user) {
            res.status(400).json({ message: "User not found!" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error while deleting User.", error: error.message });
    }
};
exports.deleteUser = deleteUser;
//Function to get current user
const currentUser = async (req, res) => {
    try {
        const id = req.user?.id;
        if (!id) {
            res.status(401).json({ message: "User not logged in." });
            return;
        }
        const currentUser = await prisma_1.prisma.user.findFirst({
            where: { id },
        });
        res.status(200).json({ message: "Current User.", user: currentUser });
    }
    catch (error) {
        res.status(404).json({ message: "User not login" });
    }
};
exports.currentUser = currentUser;
