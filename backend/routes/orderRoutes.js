import express from "express";

import {
  createRazorpayOrder,
  verifyPayment,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post(
  "/create-order",
  protect,
  createRazorpayOrder
);

router.post(
  "/verify-payment",
  protect,
  verifyPayment
);

export default router;