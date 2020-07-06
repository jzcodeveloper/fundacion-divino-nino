const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/error");
const User = require("../models/user");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  const token =
    authorization && authorization.startsWith("Bearer")
      ? authorization.split(" ")[1]
      : null;

  // Make sure token exists
  if (!token)
    return next(new ErrorResponse("Not authorized to access this route", 401));

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse(err, 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
