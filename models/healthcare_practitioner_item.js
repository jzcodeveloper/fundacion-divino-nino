const mongoose = require("mongoose");

const HealthcarePractitionerItem = new mongoose.Schema({
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

  item: {
    type: mongoose.Schema.ObjectId,
    ref: "Item",
  },
});

module.exports = mongoose.model(
  "Healthcare Practitioner Item",
  HealthcarePractitionerItem
);
