const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
} = require("../../controller/product-controller");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const router = express.Router();

router.post("/", isLoggedIn, createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);

module.exports = router;
