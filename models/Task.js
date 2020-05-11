const mongoose = require("mongoose");
const { generateId, updateActivities } = require("../utils/methods");
const { createActivity } = require("../utils/dates");

const Global = require("../models/Global");
const Log = require("./Log");
const Data = require("./Data");
const Model = require("./Model");
const Dataset = require("./Dataset");
const Question = require("./Question");

const TaskSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },

  title: {
    type: String,
    required: [true, "Please add a title"],
    unique: true,
    trim: true,
    maxlength: [50, "Title can not be more than 50 characters"]
  },

  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description can not be more than 500 characters"]
  },

  steps: {
    type: [String],
    required: [true, "Please add some steps"],
    trim: true,
    maxlength: [100, "Step can not be more than 100 characters"]
  },

  tips: {
    type: [String],
    required: [true, "Please add some tips"],
    trim: true,
    maxlength: [200, "Tip can not be more than 200 characters"]
  },

  questions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Question"
    }
  ],

  dataset: {
    type: mongoose.Schema.ObjectId,
    ref: "Dataset"
  },

  totalQuestions: {
    type: Number,
    default: 0
  },

  timesCompleted: {
    type: Number,
    default: 0
  },

  averageTime: {
    type: Number,
    default: 0
  },

  maxTasks: {
    type: Number,
    default: 1
  },

  tasksActivity: [
    {
      date: Date,
      total: { type: Number, default: 0 }
    }
  ],

  history: [
    {
      contributor: {
        type: mongoose.Schema.ObjectId,
        ref: "Contributor"
      },
      date: Date,
      totalTasks: { type: Number, default: 0 },
      totalQuestions: { type: Number, default: 0 },
      totalTime: { type: Number, default: 0 }
    }
  ],

  admin: {
    type: mongoose.Schema.ObjectId,
    ref: "Admin"
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  enabled: {
    type: Boolean,
    default: false
  },

  testOnly: {
    type: Boolean,
    default: false
  }
});

TaskSchema.methods.updateGlobalStats = async function() {
  this.timesCompleted += 1;
  this.averageTime = await Data.getAverageTime(this._id);
  this.tasksActivity[this.tasksActivity.length - 1].total += 1;

  return await this.save();
};

TaskSchema.methods.updateHistory = async function(data) {
  const index = this.history.findIndex(
    record => record.contributor.toString() === data.contributor.toString()
  );

  if (index > -1) {
    this.history[index].totalTasks += 1;
    this.history[index].totalQuestions += Object.keys(data.data).length;
    this.history[index].totalTime += data.time;
  } else {
    this.history.push({ contributor: data.contributor, date: new Date() });
  }

  return await this.save();
};

TaskSchema.pre("find", async function(next) {
  this.populate("questions");
  next();
});

TaskSchema.pre("findOne", async function(next) {
  this.populate("questions");
  next();
});

TaskSchema.pre("findOneAndUpdate", async function(next) {
  this.populate("questions");
  next();
});

TaskSchema.post("find", async function(doc, next) {
  const keys = ["tasksActivity"];
  return await updateActivities(doc, next, keys);
});

TaskSchema.post("findOne", async function(doc, next) {
  const keys = ["tasksActivity"];
  return await updateActivities(doc, next, keys);
});

TaskSchema.pre("save", async function(next) {
  this.wasNew = this.isNew;
  next();
});

TaskSchema.post("save", async function(doc, next) {
  if (!this.wasNew) return next();

  // Update global stats
  const global = await Global.findOne({ id: "global" });
  await global.updateTasks(doc._id);

  // Generate id for the task
  doc.id = await generateId("task");
  doc.tasksActivity = createActivity(5);
  doc.totalQuestions = doc.questions.length;

  return await doc.save();
});

TaskSchema.post("findOneAndDelete", async function(doc, next) {
  // Remove questions
  await Question.deleteMany({ _id: doc.questions });

  // Remove dataset
  await Dataset.findByIdAndDelete(doc.dataset);

  // Update global stats
  const global = await Global.findOne({ id: "global" });
  await global.removeTask(doc._id);

  next();
});

module.exports = mongoose.model("Task", TaskSchema);
