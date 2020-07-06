const mongoose = require("mongoose");

const Currency = new mongoose.Schema({
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

  currency_name: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    required: true,
  },

  symbol: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    required: true,
  },

  _comments: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
});

module.exports = mongoose.model("Currency", Currency);
