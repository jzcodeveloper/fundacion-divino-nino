const express = require("express");
const router = express.Router();

const advancedResults = require("../middlewares/advancedResults");
const { protect, authorize } = require("../middlewares/auth");

const { getMe } = require("../controllers/auth");
const {
  login,
  getContributors,
  getHistory,
} = require("../controllers/contributor");

const Contributor = require("../models/Contributor");

// @methods   POST
// @route     /api/contributors/login
// @access    Admin
router.post("/login", login);

// @methods   GET
// @route     /api/contributors/
// @access    Admin
router.get(
  "/",
  protect,
  authorize("admin"),
  advancedResults(Contributor),
  getContributors
);

// @methods   GET
// @route     /api/contributors/me
// @access    Contributor
router.get("/me", protect, (req, res, next) => {
  console.log(req);
});

// @methods   GET
// @route     /api/contributors/me/history
// @access    Contributor
router.get("/me/history", protect, authorize("contributor"), getHistory);

module.exports = router;
