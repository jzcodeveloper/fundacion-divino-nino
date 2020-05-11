const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const { getGlobalStats } = require("../controllers/global");

// @methods   GET
// @route     /api/global/
// @access    Admin
router.get("/", protect, authorize("admin"), getGlobalStats);

module.exports = router;
