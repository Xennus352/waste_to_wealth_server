"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedback_controller_1 = require("../controllers/feedback.controller");
const router = (0, express_1.Router)();
// Route to get all feedbacks
router.get("/", feedback_controller_1.getFeedbacks);
// Route to get a single feedback by ID
router.get("/:id", feedback_controller_1.getSingleFeedback);
// Route to create a new feedback
router.post("/create-feedback", feedback_controller_1.createFeedback);
// Route to delete a feedback by ID
router.delete("/:id", feedback_controller_1.deleteFeedback);
exports.default = router;
