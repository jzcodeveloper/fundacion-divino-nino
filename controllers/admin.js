const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/error");

const Log = require("../models/Log");
const Admin = require("../models/Admin");

// @desc      Login admin
// @route     POST /api/admins/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate email & password
  if (!username || !email || !password)
    return next(new ErrorResponse("Please fill out all the fields.", 400));

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) return next(new ErrorResponse("Invalid credentials", 401));

  // Check if password matches
  const isMatch = await admin.matchPassword(password);

  if (!isMatch) return next(new ErrorResponse("Invalid credentials", 401));

  const token = admin.getSignedJwtToken();

  // Update activity
  await admin.updateActivity();
  await admin.updateLastSignIn();

  res.status(200).json({ success: true, data: token });
});

// @desc      Update admin
// @route     POST /api/admins/me
// @access    Admin
exports.updateAdmin = asyncHandler(async (req, res, next) => {
  const { degree, username, email } = req.body;

  // Validate passwords
  if (!degree || !username || !email)
    return next(new ErrorResponse("Please fill out all the fields.", 400));

  let admin = await Admin.findById(req.user._id);

  if (!admin) return next(new ErrorResponse("Invalid credentials", 401));

  admin = await Admin.findByIdAndUpdate(req.user._id, req.body, { new: true });

  Admin.updateLogs({
    action: "Actualización",
    message: "¡Has actualizado tus datos personales!",
    createdBy: req.user._id
  });

  res.status(200).json({ success: true, data: admin });
});

// @desc      Update admin password
// @route     POST /api/admins/me/password
// @access    Admin
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { password, password2 } = req.body;

  // Validate passwords
  if (!password || !password2)
    return next(new ErrorResponse("Please fill out all the fields.", 400));

  // Check if they are the same
  if (password === password2)
    return next(new ErrorResponse("Passwords must be different.", 400));

  const admin = await Admin.findById(req.user._id).select("+password");

  if (!admin) return next(new ErrorResponse("Invalid credentials", 401));

  // Check if password matches
  const isMatch = await admin.matchPassword(password);

  if (!isMatch) return next(new ErrorResponse("Invalid credentials", 401));

  /* await Admin.findByIdAndUpdate(req.user._id, { password: password2 }); */

  Admin.updateLogs({
    action: "Actualización",
    message: "¡Has actualizado tu contraseña!",
    createdBy: req.user._id
  });

  res.status(200).json({ success: true, data: {} });
});

// @methods   GET
// @route     /api/admins/me/logs
// @access    Admin
exports.getLogs = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.user._id);

  if (!admin) return next(new ErrorResponse("This admin does not exist", 404));

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = admin.logs.length;

  const results = await Admin.findById(req.user._id, { _id: 1 })
    .slice("logs", [startIndex, limit])
    .populate("logs");

  res.status(200).json({
    success: true,
    data: { total, page, results: results.logs }
  });
});
