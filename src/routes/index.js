const express = require("express");
const router = express.Router();
const userRoutes = require("./v1/user-routes");
const productRoutes = require("./v1/product-routes");

//user routes
router.use("/v1/users", userRoutes);
//products routes
router.use("/v1/products", productRoutes);

module.exports = router;
