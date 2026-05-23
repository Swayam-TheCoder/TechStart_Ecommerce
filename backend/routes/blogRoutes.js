import express from "express";

import {
  getBlogs,
  getSingleBlog,
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blogController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// GET BLOGS
router.get("/", getBlogs);

// GET SINGLE BLOG
router.get("/:id", getSingleBlog);

// CREATE BLOG
router.post("/", protect, admin, upload.single("image"), createBlog);

// UPDATE BLOG
router.put("/:id", protect, admin, upload.single("image"), updateBlog);

// DELETE BLOG
router.delete("/:id", protect, admin, deleteBlog);

export default router;
