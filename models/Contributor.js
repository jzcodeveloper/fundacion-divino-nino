const mongoose = require("mongoose");
const { generateId, updateActivities } = require("../utils/methods");
const { createActivity } = require("../utils/dates");

const Global = require("../models/Global");
const User = require("./User");

const ContributorSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },

  totalTasks: {
    type: Number,
    default: 0,
  },

  totalQuestions: {
    type: Number,
    default: 0,
  },

  totalTime: {
    type: Number,
    default: 0,
  },

  tasksActivity: [
    {
      date: Date,
      total: { type: Number, default: 0 },
    },
  ],

  loginActivity: [
    {
      date: Date,
      total: { type: Number, default: 0 },
    },
  ],

  history: [
    {
      task: {
        _id: { type: String },
        id: { type: String },
        title: { type: String },
      },
      date: Date,
      totalTasks: { type: Number, default: 0 },
      totalQuestions: { type: Number, default: 0 },
      totalTime: { type: Number, default: 0 },
    },
  ],

  lastSignIn: {
    type: [Date],
  },

  role: {
    type: String,
    default: "contributor",
  },
});

ContributorSchema.methods.updateLastSignIn = async function () {
  if (this.lastSignIn.length === 2) this.lastSignIn.shift();
  this.lastSignIn.push(new Date());
  return await this.save();
};

ContributorSchema.methods.updateActivity = async function () {
  this.loginActivity[this.loginActivity.length - 1].total += 1;

  return await this.save();
};

ContributorSchema.methods.updateHistory = async function (data, task) {
  const index = this.history.findIndex(
    (record) => record.task._id.toString() === data.task.toString()
  );

  if (index > -1) {
    this.history[index].totalTasks += 1;
    this.history[index].totalQuestions += Object.keys(data.data).length;
    this.history[index].totalTime += data.time;
  } else {
    this.history.push({
      task: { _id: task._id, id: task.id, title: task.title },
      date: new Date(),
      totalTasks: 1,
      totalQuestions: Object.keys(data.data).length,
      totalTime: data.time,
    });
  }

  return await this.save();
};

ContributorSchema.methods.updateGlobalStats = async function (data) {
  this.totalTasks += 1;
  this.totalQuestions += Object.keys(data.data).length;
  this.totalTime += data.time;
  this.tasksActivity[this.tasksActivity.length - 1].total += 1;

  return await this.save();
};

ContributorSchema.post("findOne", async function (doc, next) {
  const keys = ["tasksActivity"];
  return await updateActivities(doc, next, keys);
});

ContributorSchema.pre("save", async function (next) {
  this.wasNew = this.isNew;
  next();
});

ContributorSchema.post("save", async function (doc, next) {
  if (!this.wasNew) return next();

  // Update global stats
  const global = await Global.findOne({ id: "global" });
  await global.updateContributors(doc._id);

  // Generate id for contributor
  doc.id = await generateId("contributor");
  doc.loginActivity = createActivity(5);
  doc.tasksActivity = createActivity(5);

  return await doc.save();
});

ContributorSchema.post("findOneAndDelete", async function (doc, next) {
  // Update global stats
  const global = await Global.findOne({ id: "global" });
  await global.removeContributor(doc._id);

  next();
});

User.discriminator("Contributor", ContributorSchema);

module.exports = mongoose.model("Contributor");
