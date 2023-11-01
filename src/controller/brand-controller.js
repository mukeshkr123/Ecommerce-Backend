const asyncHandler = require("express-async-handler");
const Brand = require("../model/Brand");

// Function to handle common error responses
const handleError = (res, status, message) => {
  res.status(status).json({
    status: "error",
    message: message,
  });
};

// @desc    Create new Brand
// @route   POST /api/v1/Brands
// @access  Private/Admin
const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  console.log(name);

  try {
    const brandExists = await Brand.findOne({ name: name.toLowerCase() });
    console.log(brandExists);
    if (brandExists) {
      throw new Error(`Brand "${name}" already exists`);
    }

    const brand = await Brand.create({
      name: name.toLowerCase(),
      user: req.userAuthId,
    });

    res.status(201).json({
      status: "success",
      message: "Brand created successfully",
      brand,
    });
  } catch (error) {
    handleError(res, 400, error.message);
  }
});

// @desc    Get All Brands
// @route   GET /api/v1/Brands
// @access  Private/Admin
const getAllBrands = asyncHandler(async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({
      status: "success",
      message: "Brands fetched successfully",
      brands,
    });
  } catch (error) {
    handleError(res, 500, "Internal Server Error");
  }
});

// @desc    Get single Brand
// @route   GET /api/v1/Brands/:id
// @access  Private/Admin
const getSingleBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      throw new Error("Brand not found");
    }
    res.status(200).json({
      status: "success",
      message: "Brand fetched successfully",
      brand,
    });
  } catch (error) {
    handleError(res, 404, error.message);
  }
});

// @desc    Update a Brand
// @route   PATCH /api/v1/Brands/:id
// @access  Private/Admin
const updateBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );
    if (!brand) {
      throw new Error("Brand not found");
    }
    res.status(200).json({
      status: "success",
      message: "Brand updated successfully",
      brand,
    });
  } catch (error) {
    handleError(res, 404, error.message);
  }
});

// @desc    Delete a Brand
// @route   DELETE /api/v1/Brands/:id
// @access  Private/Admin
const deleteBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      throw new Error("Brand not found");
    }
    res.status(200).json({
      status: "success",
      message: "Brand deleted successfully",
    });
  } catch (error) {
    handleError(res, 404, error.message);
  }
});

module.exports = {
  createBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand,
};
