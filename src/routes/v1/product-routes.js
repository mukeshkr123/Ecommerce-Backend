const express = require("express");
const createProduct = require("../../controller/product-controller");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const router = express.Router();

router.post("/", isLoggedIn, createProduct);

module.exports = router;
