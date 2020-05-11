const mongoose = require("mongoose");
const { mkdir } = require("fs").promises;
const { rimraf } = require("../utils/files");
const { generateId, updateActivities } = require("../utils/methods");
const { createActivity } = require("../utils/dates");

const Data = require("./Data");

const DatasetSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },

  title: {
    type: String,
    required: true,
  },

  task: {
    type: mongoose.Schema.ObjectId,
    ref: "Task",
  },

  dataset: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Data",
    },
  ],

  trainingDataset: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Data",
    },
  ],

  testingDataset: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Data",
    },
  ],

  splitRatio: {
    type: Number,
    default: 80,
    min: 0,
    max: 100,
  },

  dataActivity: [
    {
      date: Date,
      total: { type: Number, default: 0 },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

DatasetSchema.methods.updateDataset = async function (data) {
  this.dataset.push(data._id);
  this.dataActivity[this.dataActivity.length - 1].total += 1;

  return await this.save();
};

DatasetSchema.methods.updateDatasets = async function () {
  const end = Math.floor((this.splitRatio * this.dataset.length) / 100);
  this.trainingDataset = this.dataset.slice(0, end);
  this.testingDataset = this.dataset.slice(end);

  return await this.save();
};

DatasetSchema.methods.updateSplitRatio = async function (ratio) {
  this.splitRatio = ratio;
  return await this.save();
};

DatasetSchema.methods.emptyDataset = async function () {
  // Remove data
  await Data.deleteMany({ dataset: this._id });

  this.dataset = [];
  this.dataActivity = [];
  return await this.save();
};

DatasetSchema.pre("find", async function (next) {
  this.populate("task");
  next();
});

DatasetSchema.pre("findOne", async function (next) {
  this.populate("task")
    .populate("dataset")
    .populate("trainingDataset")
    .populate("testingDataset");
  next();
});

DatasetSchema.pre("findOneAndUpdate", async function (next) {
  this.populate("task");
  next();
});

DatasetSchema.post("find", async function (doc, next) {
  const keys = ["dataActivity"];
  return await updateActivities(doc, next, keys);
});

DatasetSchema.post("findOne", async function (doc, next) {
  const keys = ["dataActivity"];
  return await updateActivities(doc, next, keys);
});

DatasetSchema.pre("save", async function (next) {
  this.wasNew = this.isNew;
  next();
});

DatasetSchema.post("save", async function (doc, next) {
  if (!this.wasNew) return next();

  // Generate id for the dataset
  doc.id = await generateId("dataset");
  doc.dataActivity = createActivity(5);

  return await doc.save();
});

DatasetSchema.post("findOneAndDelete", async function (doc, next) {
  // Remove data
  await Data.deleteMany({ dataset: doc._id });

  next();
});

module.exports = mongoose.model("Dataset", DatasetSchema);
