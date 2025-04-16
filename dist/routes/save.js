"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const save_controller_1 = require("../controllers/save.controller");
const router = (0, express_1.Router)();
// Route to get all save
router.post("/", save_controller_1.getSaves);
// Route to create a new save
router.post("/create-save", save_controller_1.createSave);
exports.default = router;
