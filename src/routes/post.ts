import { Router } from "express";
import {
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
} from "../controllers/posts.controller";

const router = Router();

// Route to get all posts
router.get("/", getPosts);

// Route to get a single post by ID
router.get("/:id", getSinglePost);

// Route to create a new post
router.post("/create-post", createPost);

// Route to update a post by ID
router.put("/:id", updatePost);

// Route to delete a post by ID
router.delete("/:id", deletePost);

export default router;
