const mongoose = require("mongoose");

const Item = new mongoose.Schema({
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

  item_name: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    required: true,
  },

  price: {
    type: Number,
    min: 0,
    default: 0,
    required: true,
  },

  currency: {
    type: mongoose.Schema.ObjectId,
    ref: "Currency",
  },

  practitioner_payroll: {
    type: Number,
    min: 0,
    default: 0,
    required: true,
  },

  foundation_payroll: {
    type: Number,
    min: 0,
    default: 0,
    required: true,
  },

  _comments: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
});

module.exports = mongoose.model("Item", Item);
