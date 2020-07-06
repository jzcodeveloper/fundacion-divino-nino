const mongoose = require("mongoose");

const HealthcarePractitioner = new mongoose.Schema({
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

  national_id: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    required: true,
  },

  first_name: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    required: true,
  },

  second_name: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "",
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

  gender: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "",
  },

  items: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Healthcare Practitioner Item",
    },
  ],

  _comments: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
});

module.exports = mongoose.model(
  "Healthcare Practitioner",
  HealthcarePractitioner
);
