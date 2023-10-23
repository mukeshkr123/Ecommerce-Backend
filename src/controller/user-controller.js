const User = require("../model/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");

// @desc    Register user
// @route   POST /api/v1/users/register
// @access  Public

const register = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  // Input validation
  if (!fullname || !email || !password) {
    res.status(400).json({
      status: "error",
      message: "Please provide all required information.",
    });
    return;
  }

  // Check if the user is already registered
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({
      status: "error",
      message: "User already registered",
    });
    return;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: user,
  });
});

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    res.status(400).json({
      status: "error",
      message: "Please provide email and password.",
    });
    return;
  }

  // Find the user by email
  const userFound = await User.findOne({ email });

  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      user: {
        _id: userFound?._id,
        fullname: userFound?.fullname,
        isAdmin: userFound?.isAdmin,
      },
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401).json({
      status: "error",
      message: "Invalid credentials",
    });
  }
});

module.exports = {
  register,
  login,
};
