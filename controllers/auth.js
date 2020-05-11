const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/error");

const User = require("../models/User");

// @desc      Gets user data
// @route     POST /api/users/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({ success: true, data: user });
});

// @desc      Reset user password
// @route     POST /api/users/resetPassword
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  //
});
