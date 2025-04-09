import { Router } from "express";
import {
  getOrders,
  getSingleOrder,
  createOrder,
  deleteOrder,
} from "../controllers/order.controller";

const router = Router();

// Route to get all orders
router.get("/", getOrders);

// Route to get a single order by ID
router.get("/:id", getSingleOrder);

// Route to create a new order
router.post("/create-order", createOrder);

// Route to update a order by ID
// router.put("/order/:id", updateorder);

// Route to delete a order by ID
router.delete("/:id", deleteOrder);

export default router;
