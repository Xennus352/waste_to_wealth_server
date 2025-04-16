"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likes_controller_1 = require("../controllers/likes.controller");
const router = (0, express_1.Router)();
// Route to get all like
router.post("/", likes_controller_1.getLikes);
// Route to create a new like
router.post("/create-like", likes_controller_1.createLike);
exports.default = router;
