const mongoose = require("mongoose");

const DocType = new mongoose.Schema({
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

  autoname: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
  },

  caption: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
  },

  color: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
  },

  description: {
    type: String,
    trim: true,
  },

  fields: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],

  icon: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
  },

  image_field: {
    type: String,
    trim: true,
  },

  in_desktop: {
    type: Boolean,
    default: true,
  },

  in_global_search: {
    type: Boolean,
    default: true,
  },

  is_table: {
    type: Boolean,
    default: false,
  },

  search_fields: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
  },

  sort_field: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
  },

  sort_order: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
  },

  permissions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "DocPerm",
    },
  ],

  quick_entry: {
    type: Boolean,
    default: false,
  },

  read_only: {
    type: Boolean,
    default: false,
  },

  _comments: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
});

module.exports = mongoose.model("DocType", DocType);
