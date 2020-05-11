const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
  getDatasets,
  getDataset,
  createData,
  updateRatio,
  emptyDataset,
  exportDataset
} = require("../controllers/datasets");

// @methods   GET
// @route     /api/datasets/
// @access    Admin
router.route("/").get(protect, authorize("admin"), getDatasets);

// @methods   GET
// @route     /api/datasets/:id
// @access    Admin
router.route("/:id").get(protect, authorize("admin"), getDataset);

// @methods   PUT
// @route     /api/datasets/:id/add
// @access    Contributor
router.route("/:id/add").put(protect, authorize("contributor"), createData);

// @methods   PUT
// @route     /api/datasets/:id/ratio
// @access    Admin
router.route("/:id/ratio").put(protect, authorize("admin"), updateRatio);

// @methods   GET
// @route     /api/datasets/:id/empty
// @access    Admin
router.route("/:id/empty").get(protect, authorize("admin"), emptyDataset);

// @methods   GET
// @route     /api/datasets/:id/export
// @access    Admin
router.route("/:id/export").get(protect, authorize("admin"), exportDataset);

module.exports = router;
