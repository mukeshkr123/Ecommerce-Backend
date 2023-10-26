const express = require("express");
const { createCategory } = require("../../controller/category-controller");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const router = express.Router();

router.post("/", isLoggedIn, createCategory);

module.exports = router;
