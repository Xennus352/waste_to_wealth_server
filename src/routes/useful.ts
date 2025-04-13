import { Router } from "express";
import { createUseful, getUseful } from "../controllers/useful.controller";

const router = Router();

// Route to get all useful
router.post("/", getUseful);

// Route to create a new useful
router.post("/create-useful", createUseful);

export default router;
