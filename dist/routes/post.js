"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_controller_1 = require("../controllers/posts.controller");
const router = (0, express_1.Router)();
// Route to get all posts
router.get("/", posts_controller_1.getPosts);
// Route to get a single post by ID
router.get("/:id", posts_controller_1.getSinglePost);
// Route to create a new post
router.post("/create-post", posts_controller_1.createPost);
// Route to update a post by ID
router.put("/:id", posts_controller_1.updatePost);
// Route to delete a post by ID
router.delete("/:id", posts_controller_1.deletePost);
exports.default = router;
