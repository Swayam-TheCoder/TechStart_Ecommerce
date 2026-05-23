import express from "express";

import {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", getProducts);

// GET SINGLE PRODUCT
router.get("/:id", getSingleProduct);

// CREATE
router.post("/", protect, admin, upload.single("image"), createProduct);

// UPDATE
router.put("/:id", upload.single("image"), updateProduct);

// DELETE
router.delete("/:id", protect, admin, deleteProduct);

export default router;
