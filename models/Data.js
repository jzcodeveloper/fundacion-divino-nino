const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.Mixed
  },

  time: {
    type: Number,
    default: 0
  },

  task: {
    type: mongoose.Schema.ObjectId,
    ref: "Task"
  },

  dataset: {
    type: mongoose.Schema.ObjectId,
    ref: "Dataset"
  },

  contributor: {
    type: mongoose.Schema.ObjectId,
    ref: "Contributor"
  }
});

// Static method to get avg of course tuitions
DataSchema.statics.getAverageTime = async function(task) {
  const obj = await this.aggregate([
    { $match: { task: task._id } },
    { $group: { _id: "$time", averageTime: { $avg: "$time" } } }
  ]);

  return obj[0].averageTime;
};

module.exports = mongoose.model("Data", DataSchema);
