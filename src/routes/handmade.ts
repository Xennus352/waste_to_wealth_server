import { Router } from "express";
import {
  createHandmade,
  deleteHandmade,
  getHandmades,
  getSingleHandmade,
  updateHandmade,
} from "../controllers/handmade.controller";

const router = Router();

// Route to get all handmade
router.get("/", getHandmades);

// Route to get a single handmade by ID
router.get("/:id", getSingleHandmade);

// Route to create a new handmade
router.post("/add-guide", createHandmade);

// Route to update a handmade by ID
router.put("/:id", updateHandmade);

// Route to delete a handmade by ID
router.delete("/:id", deleteHandmade);

export default router;
