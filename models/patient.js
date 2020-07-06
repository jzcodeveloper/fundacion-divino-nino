const mongoose = require("mongoose");

const Patient = new mongoose.Schema({
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

  dob: {
    type: Date,
  },

  municipality: {
    type: mongoose.Schema.ObjectId,
    ref: "Municipality",
  },

  parish: {
    type: mongoose.Schema.ObjectId,
    ref: "Parish",
  },

  sector: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "",
  },

  email: {
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

  _comments: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
});

module.exports = mongoose.model("Patient", Patient);
