import Product from "../models/Product.js";

import Blog from "../models/Blog.js";

import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalBlogs = await Blog.countDocuments();

    const totalUsers = await User.countDocuments();

    const latestProducts = await Product.find()

      .sort({
        createdAt: -1,
      })

      .limit(5);

    const latestBlogs = await Blog.find()

      .sort({
        createdAt: -1,
      })

      .limit(5);

    res.json({
      totalProducts,

      totalBlogs,

      totalUsers,

      latestProducts,

      latestBlogs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
