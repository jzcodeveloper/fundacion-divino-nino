const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth");
const { login, getMe } = require("../controllers/users");

// @methods   POST
// @route     /api/users/login
// @access    Admin
router.post("/login", login);

// @methods   GET
// @route     /api/users/me
// @access    Contributor
router.get("/me", protect, getMe);

module.exports = router;
