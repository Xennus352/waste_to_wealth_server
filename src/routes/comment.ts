import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controllers/comments.controller";

const router = Router();

// Route to get all comments
router.get("/:id", getComments);

// Route to create a new comment
router.post("/create-comment/:id", createComment);

// Route to update a comment by ID
// router.put("/:id", updateComment);

// Route to delete a comment by ID
router.delete("/:id", deleteComment);

export default router;
