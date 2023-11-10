const Color = require("../model/Color");
const asyncHandler = require("express-async-handler");

// @desc    Create new Color
// @route   POST /api/v1/colors
// @access  Private/Admin

const createColor = asyncHandler(async (req, res) => {
  let { name } = req.body;
  name = name.toLowerCase();
  // check if color already exists
  const colorFound = await Color.findOne({ name });
  if (colorFound) {
    throw new Error(`Color ${name} already exists`);
  }

  //create a color
  const color = await Color.create({
    name: name,
    user: req.userAuthId,
  });

  res.status(201).json({
    success: true,
    message: "Color created successfully",
    color,
  });
});

// @desc    Get all colors
// @route   GET /api/colors
// @access  Public

const getAllColorCtrl = asyncHandler(async (req, res) => {
  const colors = await Color.find();
  res.status(200).json({
    success: true,
    message: "Colors fetched successfully",
    colors,
  });
});

// @desc    Get single color
// @route   GET /api/colors/:id
// @access  Public

const getSingleColorCtrl = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);

  if (!color) {
    throw new Error("Color not found");
  }

  res.status(200).json({
    success: true,
    message: "Color fetched successfully",
    color,
  });
});

// @desc    Update color
// @route   PUT /api/colors/:id
// @access  Private/Admin

const updateColorCtrl = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);

  if (!color) {
    throw new Error("Color not found");
  }

  color.name = req.body.name;

  color.save();

  res.status(200).json({
    success: true,
    message: "Color updated successfully",
    color,
  });
});

// @desc    delete color
// @route   DELETE /api/colors/:id
// @access  Private/Admin

const deleteColorCtrl = asyncHandler(async (req, res) => {
  await Color.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "color deleted successfully",
  });
});

module.exports = {
  createColor,
  getAllColorCtrl,
  getSingleColorCtrl,
  updateColorCtrl,
  deleteColorCtrl,
};
