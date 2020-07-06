const mongoose = require("mongoose");

const SalesInvoicePayment = new mongoose.Schema({
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

  mode_of_payment: {
    type: mongoose.Schema.ObjectId,
    ref: "Mode of Payment",
  },

  amount: {
    type: Number,
    min: 0,
    default: 0,
    required: true,
  },

  currency: {
    type: mongoose.Schema.ObjectId,
    ref: "Currency",
  },

  bank: {
    type: mongoose.Schema.ObjectId,
    ref: "Bank",
  },

  bank_reference_number: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "",
  },

  date: {
    type: Date,
  },
});

module.exports = mongoose.model("Sales Invoice Payment", SalesInvoicePayment);
