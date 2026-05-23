import Blog from "../models/Blog.js";

// =========================
// GET BLOGS
// =========================

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()

      .sort({
        createdAt: -1,
      });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// GET SINGLE BLOG
// =========================

export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    res.json(blog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// CREATE BLOG
// =========================

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      title: req.body.title,

      description: req.body.description,

      category: req.body.category,

      content: req.body.content,

      image: req.file.path,
    });

    res.status(201).json(blog);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// DELETE BLOG
// =========================

export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    res.json({
      message: "Blog Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// UPDATE BLOG
// =========================

export const updateBlog = async (req, res) => {
  try {
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      content: req.body.content,
    };

    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true },
    );

    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
