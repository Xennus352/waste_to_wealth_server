import { Router } from "express";
import { createSave, getSaves } from "../controllers/save.controller";

const router = Router();

// Route to get all save
router.post("/", getSaves);

// Route to create a new save
router.post("/create-save", createSave);

export default router;
