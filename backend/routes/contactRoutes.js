import express from "express";

import {
  sendMessage,
  getMessages,
} from "../controllers/contactController.js";

const router = express.Router();

// SEND MESSAGE
router.post("/", sendMessage);

// GET MESSAGES
router.get("/", getMessages);

export default router;