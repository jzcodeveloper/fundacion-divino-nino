const mongoose = require("mongoose");

const Counter = new mongoose.Schema({
  _id: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    required: true,
  },

  seq: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Counter", Counter);
