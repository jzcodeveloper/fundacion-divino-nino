const express = require("express");
const router = express.Router();

const advancedResults = require("../middlewares/advancedResults");

const { protect } = require("../middlewares/auth");
const {
  fetchDocuments,
  createDocuments,
  updateDocuments,
  deleteDocuments,
} = require("../controllers/documents");

/**
 * @method GET
 * @route  /api/documents/
 * @access Private
 */
router.route("/").get(advancedResults(), fetchDocuments);

/**
 * @method POST
 * @route  /api/documents/
 * @access Private
 */
router.route("/").post(protect, createDocuments);

/**
 * @method PUT
 * @route  /api/documents/
 * @access Private
 */
router.route("/").put(protect, updateDocuments);

/**
 * @method POST
 * @route  /api/documents/
 * @access Private
 */
router.route("/deleteMany").post(protect, deleteDocuments);

module.exports = router;
