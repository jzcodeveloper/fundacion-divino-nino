const mongoose = require("mongoose");

const CurrencyExchange = new mongoose.Schema({
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

  from_currency: {
    type: mongoose.Schema.ObjectId,
    ref: "Currency",
  },

  to_currency: {
    type: mongoose.Schema.ObjectId,
    ref: "Currency",
  },

  pair_name: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    required: true,
  },

  exchange_rate: {
    type: Number,
    min: 0,
    defult: 0,
    required: true,
  },

  _comments: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
});

module.exports = mongoose.model("Currency Exchange", CurrencyExchange);
