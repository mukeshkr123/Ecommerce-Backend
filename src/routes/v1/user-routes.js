const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../../controller/user-controller");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", isLoggedIn, getProfile);

module.exports = router;
