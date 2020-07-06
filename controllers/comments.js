const mongoose = require("mongoose");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/error");

/**
 * @desc   Get multiple comments
 * @route  GET /api/comments/
 * @access Private
 */
exports.fetchDocuments = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * @desc   Create multiple documents
 * @route  POST /api/documents/
 * @access Private
 */
exports.createDocuments = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: result });
});

/**
 * @desc   Update a single document
 * @route  GET /api/documents/
 * @access Private
 */
exports.updateDocument = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: result });
});

/**
 * @desc   Delete multiple documents
 * @route  GET /api/documents/?model=Model&subfields=field1,field2&submodels=Model1,Model2
 * @access Private
 */
exports.deleteDocuments = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: result });
});
