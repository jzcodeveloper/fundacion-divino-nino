const mongoose = require("mongoose");

const SalesInvoice = new mongoose.Schema({
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

  patient: {
    type: mongoose.Schema.ObjectId,
    ref: "Patient",
  },

  date: {
    type: Date,
    default: Date.now,
  },

  time: {
    type: Date,
    default: Date.now,
  },

  services: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Sales Invoice Service",
    },
  ],

  payments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Sales Invoice Payment",
    },
  ],

  currency_exchange: {
    type: mongoose.Schema.ObjectId,
    ref: "Currency Exchange",
  },

  exchange_rate: {
    type: Number,
    min: 0,
    default: 0,
  },

  total_usd: {
    type: Number,
    default: 0,
  },

  total_ves: {
    type: Number,
    default: 0,
  },

  total_paid_usd: {
    type: Number,
    default: 0,
  },

  total_paid_ves: {
    type: Number,
    default: 0,
  },

  outstanding_amount_usd: {
    type: Number,
    default: 0,
  },

  outstanding_amount_ves: {
    type: Number,
    default: 0,
  },

  total_practitioner_payroll_usd: {
    type: Number,
    default: 0,
  },

  total_practitioner_payroll_ves: {
    type: Number,
    default: 0,
  },

  total_foundation_payroll_usd: {
    type: Number,
    default: 0,
  },

  total_foundation_payroll_ves: {
    type: Number,
    default: 0,
  },

  paid: {
    type: Boolean,
    default: false,
  },

  _comments: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
});

module.exports = mongoose.model("Sales Invoice", SalesInvoice);
