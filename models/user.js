const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    index: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  created_by: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "Administrator",
  },

  parent_model: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "",
  },

  parent_name: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "",
  },

  updated_at: {
    type: Date,
    default: Date.now,
  },

  updated_by: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "Administrador",
  },

  enabled: {
    type: Boolean,
    default: true,
  },

  email: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    required: true,
  },

  role: {
    type: mongoose.Schema.ObjectId,
    ref: "Role",
  },

  first_name: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    required: true,
  },

  last_name: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "",
  },

  full_name: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "",
  },

  username: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "",
  },

  gender: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "",
  },

  mobile: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "",
  },

  phone: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "",
  },

  dob: {
    type: Date,
  },

  bio: {
    type: String,
    trim: true,
    default: "",
  },

  password: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "",
  },

  _comments: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
});

// Encrypt password using bcrypt
User.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  if (!this.username) {
    this.username = this.first_name;
  }
});

// Encrypt password using bcrypt
User.post("findOneAndUpdate", async function (doc, next) {
  const salt = await bcrypt.genSalt(10);
  doc.password = await bcrypt.hash(doc.password, salt);
  if (!doc.username) {
    doc.username = doc.first_name;
  }
});

// Sign JWT and return
User.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET /* {
    expiresIn: process.env.JWT_EXPIRE,
  } */
  );
};

// Match user entered password to hashed password in database
User.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", User);
