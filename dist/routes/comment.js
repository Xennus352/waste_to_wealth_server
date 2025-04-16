"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_controller_1 = require("../controllers/comments.controller");
const router = (0, express_1.Router)();
// Route to get all comments
router.get("/:id", comments_controller_1.getComments);
// Route to create a new comment
router.post("/create-comment/:id", comments_controller_1.createComment);
// Route to update a comment by ID
// router.put("/:id", updateComment);
// Route to delete a comment by ID
router.delete("/:id", comments_controller_1.deleteComment);
exports.default = router;
