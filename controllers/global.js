const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/error");

const Global = require("../models/Global");

// @desc      Gets global stats
// @route     GET /api/global/
// @access    Admin
exports.getGlobalStats = asyncHandler(async (req, res, next) => {
  const global = await Global.findOne({ id: "global" });

  if (!global) return next(new ErrorResponse("This model does not exist", 404));

  res.status(200).json({ success: true, data: global });
});
