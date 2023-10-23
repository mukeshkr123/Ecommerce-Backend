const User = require("../model/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");

// @desc    Register user
// @route   POST /api/v1/users/register
// @access  Private/Admin

const register = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  //check if user is already registered
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already registered");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create the user
  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    status: "success",
    message: "User registerd successfully",
    data: user,
  });
});

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //find the user by  email
  const userFound = await User.findOne({ email });

  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.status(200).json({
      status: "success",
      message: "User loged in successfully",
      userFound: {
        _id: userFound?._id,
        fullname: userFound?.fullname,
        isAdmin: userFound?.isAdmin,
      },
      token: generateToken(userFound?._id),
    });
  } else {
    throw new Error("Invalid credentials");
  }
});

module.exports = {
  register,
  login,
};
