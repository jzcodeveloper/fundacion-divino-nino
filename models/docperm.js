const mongoose = require("mongoose");

const DocPerm = new mongoose.Schema({
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

  role: {
    type: mongoose.Schema.ObjectId,
    ref: "Role",
  },

  create: {
    type: Boolean,
    default: false,
  },

  read: {
    type: Boolean,
    default: false,
  },

  update: {
    type: Boolean,
    default: false,
  },

  delete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("DocPerm", DocPerm);
