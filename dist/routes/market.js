"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const market_controller_1 = require("../controllers/market.controller");
const router = (0, express_1.Router)();
// Route to get all products
router.get("/", market_controller_1.getProducts);
// Route to get a single product by ID
router.get("/:id", market_controller_1.getSingleProduct);
// Route to create a new product
router.post("/create-product", market_controller_1.createProduct);
// Route to update a product by ID
router.put("/:id", market_controller_1.updateProduct);
// Route to delete a product by ID
router.delete("/:id", market_controller_1.deleteProduct);
exports.default = router;
