const express = require("express");
const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../../controller/category-controller");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const router = express.Router();

router.post("/", isLoggedIn, createCategory);
router.get("/", isLoggedIn, getAllCategories);
router.get("/:id", isLoggedIn, getSingleCategory),
  router.delete("/:id", isLoggedIn, deleteCategory);
router.put("/:id", isLoggedIn, updateCategory);

module.exports = router;
