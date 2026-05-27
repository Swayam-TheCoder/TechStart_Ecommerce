import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";

// CREATE RAZORPAY ORDER
export const createRazorpayOrder =
  async (req, res) => {
    try {
      const { amount } = req.body;
      const options = {
        amount: amount * 100,
        currency: "INR",
      };

      const order =
        await razorpay.orders.create(
          options
        );
      res.json(order);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
};

// VERIFY & SAVE ORDER
export const verifyPayment =
  async (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderItems,
        shippingAddress,
        totalPrice,
      } = req.body;

      // VERIFY SIGNATURE

      const generatedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env.RAZORPAY_KEY_SECRET
          )
          .update(
            razorpay_order_id +
            "|" +
            razorpay_payment_id
          )
          .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({
          message: "Payment verification failed",
        });
      }

      // SAVE ORDER

      const order = await Order.create({
        user: req.user._id,
        orderItems,
        shippingAddress,
        totalPrice,
        isPaid: true,
        paidAt: Date.now(),
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
      });
      res.status(201).json(order);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
};