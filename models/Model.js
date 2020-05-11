const mongoose = require("mongoose");
const { mkdir } = require("fs").promises;
const { rimraf } = require("../utils/files");
const { generateId, updateActivities } = require("../utils/methods");
const { createActivity } = require("../utils/dates");

const Global = require("./Global");
const Log = require("./Log");

const ModelSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },

  title: {
    type: String,
    required: true,
  },

  inputShape: {
    type: Number,
    default: 1,
    min: 1,
  },

  labels: {
    type: mongoose.Schema.Types.Mixed,
  },

  layers: [
    {
      class: {
        type: String,
        default: "dense",
      },

      units: {
        type: Number,
        default: 5,
      },

      activation: {
        type: String,
        default: "sigmoid",
      },
    },
  ],

  optimizer: {
    type: String,
    enum: [
      "sgd",
      "momentum",
      "adagrad",
      "adadelta",
      "adam",
      "adamax",
      "rmsprop",
    ],
    default: "adam",
    maxlength: [20, "Optimizer function can not be more than 20 characters"],
  },

  loss: {
    type: String,
    enum: [
      "absoluteDifference",
      "computeWeightedLoss",
      "cosineDistance",
      "hingeLoss",
      "huberLoss",
      "logLoss",
      "meanSquaredError",
      "sigmoidCrossEntropy",
      "softmaxCrossEntropy",
    ],
    default: "meanSquaredError",
    maxlength: [20, "Loss function can not be more than 20 characters"],
  },

  epochs: {
    type: Number,
    default: 50,
    min: 1,
  },

  batchSize: {
    type: Number,
    default: 16,
    min: 1,
  },

  learningRate: {
    type: Number,
    default: 0.06,
    min: 0.01,
  },

  acc: {
    type: Number,
    default: 0,
  },

  timesTrained: {
    type: Number,
    default: 0,
  },

  timesTested: {
    type: Number,
    default: 0,
  },

  trainedActivity: [
    {
      date: Date,
      total: { type: Number, default: 0 },
    },
  ],

  testedActivity: [
    {
      date: Date,
      total: { type: Number, default: 0 },
    },
  ],

  file: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ModelSchema.methods.updateTraining = async function (acc) {
  this.acc = acc;
  this.timesTrained += 1;
  this.trainedActivity[this.trainedActivity.length - 1].total += 1;

  return await this.save();
};

ModelSchema.methods.updateTesting = async function () {
  this.timesTested += 1;
  this.testedActivity[this.testedActivity.length - 1].total += 1;

  return await this.save();
};

ModelSchema.methods.updateLabels = async function (labels) {
  this.labels = labels;

  return await this.save();
};

ModelSchema.post("find", async function (doc, next) {
  const keys = ["trainedActivity", "testedActivity"];
  return await updateActivities(doc, next, keys);
});

ModelSchema.post("findOne", async function (doc, next) {
  const keys = ["trainedActivity", "testedActivity"];
  return await updateActivities(doc, next, keys);
});

ModelSchema.pre("save", async function (next) {
  this.wasNew = this.isNew;
  next();
});

ModelSchema.post("save", async function (doc, next) {
  if (!this.wasNew) return next();

  // Update global stats
  const global = await Global.findOne({ id: "global" });
  await global.updateModels(doc._id);

  // Generate id for the model
  doc.id = await generateId("model");
  doc.trainedActivity = createActivity(5);
  doc.testedActivity = createActivity(5);
  doc.file = `files/models/${doc._id}`;

  // Creates dir
  await mkdir(`files/models/${doc._id}`, { recursive: true });

  return await doc.save();
});

ModelSchema.post("findOneAndDelete", async function (doc, next) {
  // Removes dir recursively
  await rimraf(`files/models/${doc._id}`);

  // Update global stats
  const global = await Global.findOne({ id: "global" });
  await global.removeModel(doc._id);

  next();
});

ModelSchema.post("deleteMany", async function (doc, next) {
  // Removes dir recursively
  await rimraf(`files/models`);
});

module.exports = mongoose.model("Model", ModelSchema);
