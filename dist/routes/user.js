"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const router = (0, express_1.Router)();
// Route to get all users
router.get("/", users_controller_1.getUsers);
//Route to get current user
router.get("/current-user", users_controller_1.currentUser);
// Route to get a single user by ID
router.get("/:id", users_controller_1.getSingleUser);
// Route to update a post by ID
router.put("/:id", users_controller_1.updateUser);
// Route to delete a post by ID
router.delete("/:id", users_controller_1.deleteUser);
exports.default = router;
