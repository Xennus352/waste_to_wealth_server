"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handmade_controller_1 = require("../controllers/handmade.controller");
const router = (0, express_1.Router)();
// Route to get all handmade
router.get("/", handmade_controller_1.getHandmades);
// Route to get a single handmade by ID
router.get("/:id", handmade_controller_1.getSingleHandmade);
// Route to create a new handmade
router.post("/add-guide", handmade_controller_1.createHandmade);
// Route to update a handmade by ID
router.put("/:id", handmade_controller_1.updateHandmade);
// Route to delete a handmade by ID
router.delete("/:id", handmade_controller_1.deleteHandmade);
exports.default = router;
