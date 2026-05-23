import Product from "../models/Product.js";

// =========================
// GET PRODUCTS
// =========================

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      title: req.body.title,

      description: req.body.description,

      categories: req.body.categories.split(","),

      price: req.body.price,

      link: req.body.link,

      image: req.file ? req.file.path : "",
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      categories: req.body.categories.split(","),
      price: req.body.price,
      link: req.body.link,
    };

    // ONLY UPDATE IMAGE IF NEW IMAGE EXISTS
    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      },
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};