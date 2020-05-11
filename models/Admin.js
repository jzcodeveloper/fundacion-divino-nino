const mongoose = require("mongoose");
const { generateId, updateActivities } = require("../utils/methods");
const { createActivity } = require("../utils/dates");

const Global = require("./Global");
const Log = require("./Log");
const User = require("./User");

const AdminSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },

  tasks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Task"
    }
  ],

  models: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Task"
    }
  ],

  loginActivity: [
    {
      date: Date,
      total: { type: Number, default: 0 }
    }
  ],

  tasksActivity: [
    {
      date: Date,
      total: { type: Number, default: 0 }
    }
  ],

  modelsActivity: [
    {
      date: Date,
      total: { type: Number, default: 0 }
    }
  ],

  logs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Log"
    }
  ],

  lastSignIn: {
    type: [Date]
  },

  degree: {
    type: String
  },

  role: {
    type: String,
    default: "admin"
  }
});

AdminSchema.methods.updateLastSignIn = async function() {
  if (this.lastSignIn.length === 2) this.lastSignIn.shift();
  this.lastSignIn.push(new Date());
  return await this.save();
};

AdminSchema.methods.updateActivity = async function() {
  this.loginActivity[this.loginActivity.length - 1].total += 1;

  return await this.save();
};

AdminSchema.methods.updateTasks = async function(task) {
  this.tasks.push(task._id);
  this.tasksActivity[this.tasksActivity.length - 1].total += 1;

  return await this.save();
};

AdminSchema.methods.updateModels = async function(model) {
  this.models.push(model._id);
  this.modelsActivity[this.modelsActivity.length - 1].total += 1;

  return await this.save();
};

AdminSchema.statics.updateLogs = async function(data) {
  const admin = await this.findById(data.createdBy);
  if (!admin) return;

  const log = await Log.create(data);
  admin.logs.unshift(log._id);

  return await admin.save();
};

AdminSchema.post("findOne", async function(doc, next) {
  const keys = ["loginActivity", "tasksActivity", "modelsActivity"];
  return await updateActivities(doc, next, keys);
});

AdminSchema.pre("save", async function(next) {
  this.wasNew = this.isNew;
  next();
});

AdminSchema.post("save", async function(doc, next) {
  if (!this.wasNew) return next();

  // Update global stats
  const global = await Global.findOne({ id: "global" });
  await global.updateAdmins(doc._id);

  // Generate id for the admin
  doc.id = await generateId("admin");
  doc.loginActivity = createActivity(5);
  doc.tasksActivity = createActivity(5);
  doc.modelsActivity = createActivity(5);

  return await doc.save();
});

AdminSchema.post("findOneAndDelete", async function(doc, next) {
  // Update global stats
  const global = await Global.findOne({ id: "global" });
  await global.removeAdmin(doc._id);

  // Remove logs
  await Log.deleteMany({ createdBy: doc._id });

  next();
});

User.discriminator("Admin", AdminSchema);

module.exports = mongoose.model("Admin");
