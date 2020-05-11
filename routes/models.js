const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const { protect, authorize } = require("../middlewares/auth");

const {
  getModels,
  getModel,
  createModel,
  updateModel,
  deleteModel,
  trainModel,
  testModel
} = require("../controllers/models");

// @methods   GET | POST
// @route     /api/models/
// @access    Admin
router
  .route("/")
  .get(protect, authorize("admin"), getModels)
  .post(protect, authorize("admin"), createModel);

// @methods   GET | PUT | DELETE
// @route     /api/models/:id
// @access    Admin
router
  .route("/:id")
  .get(protect, authorize("admin"), getModel)
  .put(protect, authorize("admin"), updateModel)
  .delete(protect, authorize("admin"), deleteModel);

// @methods   PUT
// @route     /api/models/:id/train
// @access    Admin
router
  .route("/:id/train")
  .put(protect, authorize("admin"), upload.single("file"), trainModel);

// @methods   PUT
// @route     /api/models/:id/test
// @access    Admin
router
  .route("/:id/test")
  .put(protect, authorize("admin"), upload.single("file"), testModel);

module.exports = router;
