const User = require("../model/User");

// @desc    Register user
// @route   POST /api/v1/users/register
// @access  Private/Admin

const register = async (req, res) => {
  const { fullname, email, password } = req.body;

  //create the user
  const user = await User.create({
    fullname,
    email,
    password,
  });

  res.json({
    msg: user,
  });
};

module.exports = {
  register,
};
