import { Router } from "express";
import {getFeedbacks, getSingleFeedback, deleteFeedback, createFeedback } from "../controllers/feedback.controller";


const router = Router();

// Route to get all feedbacks
router.get("/", getFeedbacks);

// Route to get a single feedback by ID
router.get("/:id", getSingleFeedback);

// Route to create a new feedback
router.post("/create-feedback", createFeedback);

// Route to delete a feedback by ID
router.delete("/:id", deleteFeedback);

export default router;
