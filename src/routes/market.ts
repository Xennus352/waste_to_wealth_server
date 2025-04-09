import { Router } from "express";
import {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/market.controller";

const router = Router();

// Route to get all products
router.get("/", getProducts);

// Route to get a single product by ID
router.get("/:id", getSingleProduct);

// Route to create a new product
router.post("/create-product", createProduct);

// Route to update a product by ID
router.put("/:id", updateProduct);

// Route to delete a product by ID
router.delete("/:id", deleteProduct);

export default router;
