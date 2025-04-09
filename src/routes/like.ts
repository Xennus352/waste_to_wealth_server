import { Router } from "express";
import { createLike, getLikes } from "../controllers/likes.controller";

const router = Router();

// Route to get all like
router.post("/", getLikes);

// Route to create a new like
router.post("/create-like", createLike);

export default router;
