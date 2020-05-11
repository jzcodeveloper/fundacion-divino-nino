const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const { getMe } = require("../controllers/auth");
const {
  login,
  updateAdmin,
  updatePassword,
  getLogs,
} = require("../controllers/admin");

const Log = require("../models/Log");

// @methods   POST
// @route     /api/admins/login
// @access    Admin
router.post("/login", login);

// @methods   GET | POST
// @route     /api/admins/me
// @access    Admin
router.route("/me").get(getMe).post(protect, authorize("admin"), updateAdmin);

// @methods   POST
// @route     /api/admins/me/password
// @access    Admin
router.post("/me/password", protect, authorize("admin"), updatePassword);

// @methods   GET
// @route     /api/admins/me/logs
// @access    Admin
router.get("/me/logs", protect, authorize("admin"), getLogs);

module.exports = router;
