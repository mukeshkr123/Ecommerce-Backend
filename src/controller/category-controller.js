const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");

// @desc    Create new category
// @route   POST /api/v1/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the category already exists
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      throw new Error(`Category "${name}" already exists`);
    }

    // Create a new category
    const category = await Category.create({
      name,
      user: req.userAuthId,
    });

    res.status(201).json({
      status: "success",
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

// @desc    Get All Categories
// @route   GET /api/v1/categories
// @access  Private/Admin
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({
    status: "success",
    message: "Categories Fetched successfully",
    categories,
  });
});

// @desc    Get single Category
// @route   GET /api/v1/categories/:id
// @access  Private/Admin
const getSingleCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      throw new Error("Category not found");
    }
    res.status(200).json({
      status: "success",
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
});

// @desc    Update a Category
// @route   PATCH /api/v1/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );
    if (!category) {
      throw new Error("Category not found");
    }
    res.status(200).json({
      status: "success",
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
});

// @desc    Delete a Category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      throw new Error("Category not found");
    }
    res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
