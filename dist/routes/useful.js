"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const useful_controller_1 = require("../controllers/useful.controller");
const router = (0, express_1.Router)();
// Route to get all useful
router.post("/", useful_controller_1.getUseful);
// Route to create a new useful
router.post("/create-useful", useful_controller_1.createUseful);
exports.default = router;
