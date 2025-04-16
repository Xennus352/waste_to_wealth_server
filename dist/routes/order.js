"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const router = (0, express_1.Router)();
// Route to get all orders
router.get("/", order_controller_1.getOrders);
// Route to get a single order by ID
router.get("/:id", order_controller_1.getSingleOrder);
// Route to create a new order
router.post("/create-order", order_controller_1.createOrder);
// Route to update a order by ID
// router.put("/order/:id", updateorder);
// Route to delete a order by ID
router.delete("/:id", order_controller_1.deleteOrder);
exports.default = router;
