const mongoose = require("mongoose");

const SalesInvoiceService = new mongoose.Schema({
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

  service: {
    type: mongoose.Schema.ObjectId,
    ref: "Service",
  },

  practitioner: {
    type: mongoose.Schema.ObjectId,
    ref: "Healthcare Practitioner",
  },

  item: {
    type: mongoose.Schema.ObjectId,
    ref: "Item",
  },

  price_usd: {
    type: Number,
    default: 0,
  },

  price_ves: {
    type: Number,
    default: 0,
  },

  practitioner_payroll_usd: {
    type: Number,
    default: 0,
  },

  practitioner_payroll_ves: {
    type: Number,
    default: 0,
  },

  foundation_payroll_usd: {
    type: Number,
    default: 0,
  },

  foundation_payroll_ves: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Sales Invoice Service", SalesInvoiceService);
