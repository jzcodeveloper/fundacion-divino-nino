const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/error");

const User = require("../models/user");

/**
 * @desc   Get current user
 * @route  GET /api/users/me
 * @access Private
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({ success: true, data: user });
});

// @desc      Login user
// @route     POST /api/users/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // Validate username & password
  if (!username || !password)
    return next(new ErrorResponse("Please fill out all the fields.", 400));

  const user = await User.findOne({ username }).select("+password");

  if (!user) return next(new ErrorResponse("Invalid credentials", 401));

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) return next(new ErrorResponse("Invalid credentials", 401));

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, data: token });
});

/**
 * @desc   Reset user password
 * @route  POST /api/users/resetPassword
 * @access Private
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  //
});
