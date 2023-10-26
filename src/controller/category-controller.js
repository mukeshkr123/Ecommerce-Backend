const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");

// @desc    Create new category
// @route   POST /api/v1/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //check if category exists
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    throw new Error(`Category ${name} already exists`);
  }

  //create a new category
  const category = await Category.create({
    name,
    user: req.userAuthId,
  });

  res.status(201).json({
    status: "success",
    message: "Category created successfully",
    category,
  });
});

module.exports = {
  createCategory,
};
