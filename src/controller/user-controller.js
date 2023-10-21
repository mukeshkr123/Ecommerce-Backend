const User = require("../model/User");
const bcrypt = require("bcryptjs");

// @desc    Register user
// @route   POST /api/v1/users/register
// @access  Private/Admin

const register = async (req, res) => {
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
};

module.exports = {
  register,
};
