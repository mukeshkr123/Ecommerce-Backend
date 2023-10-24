const Product = require("../model/Product");
const asyncHandler = require("express-async-handler");

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, sizes, colors, price, totalQty, brand } =
    req.body;

  // Check if the product already exists
  const productExists = await Product.findOne({ name });
  if (productExists) {
    return res.status(400).json({
      status: "Error",
      message: `Product "${name}" already exists`,
    });
  }

  // Create the product
  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    price,
    totalQty,
    brand,
    user: req.userAuthId,
  });

  res.status(201).json({
    status: "Success",
    message: "Product created successfully",
    product,
  });
});

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: "Success",
    message: "Products fetched successfully",
    products,
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new Error("Product not found");
  }

  res.status(200).json({
    status: "success",
    message: "Product fetched successfully",
    product,
  });
});

// @desc    update  product
// @route   PUT /api/products/:id/update
// @access  Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, category, sizes, colors, price, totalQty, brand } =
    req.body;
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      category,
      sizes,
      colors,
      price,
      totalQty,
      brand,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(204).json({
    status: "success",
    message: "Product updated successfully",
    updateProduct,
  });
});

// @desc    delete  product
// @route   DELETE /api/products/:id/delete
// @access  Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
  });
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
