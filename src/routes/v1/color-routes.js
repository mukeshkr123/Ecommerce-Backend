const express = require("express");
const {
  createColor,
  getAllColorCtrl,
  getSingleColorCtrl,
  updateColorCtrl,
  deleteColorCtrl,
} = require("../../controller/color-controller");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const router = express.Router();

router.post("/", isLoggedIn, createColor);
router.get("/", isLoggedIn, getAllColorCtrl);
router.get("/:id", isLoggedIn, getSingleColorCtrl);
router.put("/:id", isLoggedIn, updateColorCtrl);
router.delete("/:id", isLoggedIn, deleteColorCtrl);

module.exports = router;
