const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/error");
const util = require("util");

const Contributor = require("../models/Contributor");

// @desc      Login contributor
// @route     POST /api/contributors/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate email & password
  if (!username || !email || !password)
    return next(new ErrorResponse("Please fill out all the fields.", 400));

  let contributor = await Contributor.findOne({ email }).select("+password");

  if (contributor) {
    // Check if password matches
    const isMatch = await contributor.matchPassword(password);

    if (!isMatch) return next(new ErrorResponse("Invalid credentials", 401));
  }

  if (!contributor) contributor = await Contributor.create(req.body);

  const token = contributor.getSignedJwtToken();

  // Update activity
  await contributor.updateActivity();
  await contributor.updateLastSignIn();

  res.status(200).json({
    success: true,
    data: token,
  });
});

// @desc      Returns all contributors
// @route     GET /api/contributors
// @access    Contributor
exports.getContributors = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Returns history
// @route     GET /api/contributors/history
// @access    Contributor
exports.getHistory = asyncHandler(async (req, res, next) => {
  const contributor = await Contributor.findById(req.user._id);

  if (!contributor)
    return next(new ErrorResponse("This contributor does not exist", 404));

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = contributor.history.length;

  const results = await Contributor.findById(req.user._id, { _id: 1 })
    .slice("history", [startIndex, limit])
    .populate("history.task");

  res.status(200).json({
    success: true,
    data: { total, page, results: results.history },
  });
});
