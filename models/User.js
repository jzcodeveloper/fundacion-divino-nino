const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const baseOptions = {
  discriminatorKey: "type",
  collection: "users"
};

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"],
      unique: true,
      trim: true,
      maxlength: [50, "Username can not be more than 50 characters"]
    },

    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      maxlength: [50, "Email can not be more than 50 characters"]
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
      trim: true,
      maxlength: [60, "Password can not be more than 50 characters"],
      select: false
    },

    createdAt: {
      type: Date,
      default: Date.now
    },

    lastSignIn: {
      type: Date,
      default: Date.now
    }
  },
  baseOptions
);

// Encrypt password using bcrypt
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
