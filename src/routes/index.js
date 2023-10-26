const express = require("express");
const router = express.Router();
const userRoutes = require("./v1/user-routes");
const productRoutes = require("./v1/product-routes");
const categoryRoutes = require("./v1/category-routes");

//user routes
router.use("/v1/users", userRoutes);
//products routes
router.use("/v1/products", productRoutes);
//category routes
router.use("/v1/categories", categoryRoutes);

module.exports = router;
