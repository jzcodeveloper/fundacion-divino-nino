const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true
    },

    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },

    message: {
      type: String,
      required: true
    },

    diff: {}
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);

module.exports = mongoose.model("Log", LogSchema);
