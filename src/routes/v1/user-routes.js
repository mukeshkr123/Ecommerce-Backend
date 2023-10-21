const express = require("express");
const { register, login } = require("../../controller/user-controller");
const router = express.Router();

router.post("/users/register", register);
router.post("/users/login", login);

module.exports = router;
