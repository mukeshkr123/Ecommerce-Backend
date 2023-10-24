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

module.exports = createProduct;
