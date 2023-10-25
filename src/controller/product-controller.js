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
  console.log(req.query);

  //query
  let productQuery = Product.find();

  //filter by name
  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }

  //filter by brand
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }

  //filter by category
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }

  //filter by color
  if (req.query.color) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.color, $options: "i" },
    });
  }

  //filter by size
  if (req.query.size) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.size, $options: "i" },
    });
  }

  //filter by price range
  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    console.log(priceRange);
    //gte: greater or equal
    //lte: less than or equal to
    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }

  // await the query
  const products = await productQuery;

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
