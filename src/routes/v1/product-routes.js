const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../../controller/product-controller");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const router = express.Router();

router.post("/", isLoggedIn, createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
