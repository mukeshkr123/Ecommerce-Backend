const express = require("express");
const {
  createBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand,
} = require("../../controller/brand-controller");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const router = express.Router();

router.post("/", isLoggedIn, createBrand);
router.get("/", isLoggedIn, getAllBrands);
router.get("/:id", isLoggedIn, getSingleBrand),
  router.delete("/:id", isLoggedIn, deleteBrand);
router.put("/:id", isLoggedIn, updateBrand);

module.exports = router;
