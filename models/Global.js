const mongoose = require("mongoose");
const { updateActivities } = require("../utils/methods");
const { createActivity } = require("../utils/dates");

const GlobalSchema = new mongoose.Schema({
  id: {
    type: String,
    default: "global"
  },

  admins: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Admin"
    }
  ],

  adminsActivity: [
    {
      date: Date,
      total: { type: Number, default: 0 }
    }
  ],

  totalAdmins: {
    type: Number,
    default: 0
  },

  contributors: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Contributor"
    }
  ],

  contributorsActivity: [
    {
      date: Date,
      total: { type: Number, default: 0 }
    }
  ],

  totalContributors: {
    type: Number,
    default: 0
  },

  tasks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Task"
    }
  ],

  tasksActivity: [
    {
      date: Date,
      total: { type: Number, default: 0 }
    }
  ],

  totalTasks: {
    type: Number,
    default: 0
  },

  models: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Model"
    }
  ],

  modelsActivity: [
    {
      date: Date,
      total: { type: Number, default: 0 }
    }
  ],

  totalModels: {
    type: Number,
    default: 0
  }
});

GlobalSchema.methods.updateAdmins = async function(admin) {
  this.admins.push(admin);
  this.totalAdmins += 1;
  this.adminsActivity[this.adminsActivity.length - 1].total += 1;
  return await this.save();
};

GlobalSchema.methods.updateContributors = async function(contributor) {
  this.contributors.push(contributor);
  this.totalContributors += 1;
  this.contributorsActivity[this.contributorsActivity.length - 1].total += 1;
  return await this.save();
};

GlobalSchema.methods.updateTasks = async function(task) {
  this.tasks.push(task);
  this.totalTasks += 1;
  this.tasksActivity[this.tasksActivity.length - 1].total += 1;
  return await this.save();
};

GlobalSchema.methods.updateModels = async function(model) {
  this.models.push(model);
  this.totalModels += 1;
  this.modelsActivity[this.modelsActivity.length - 1].total += 1;
  return await this.save();
};

GlobalSchema.methods.removeAdmin = async function(admin) {
  const index = this.admins.indexOf(
    c => c._id.toString() === admin._id.toString()
  );
  this.admins.splice(index, 1);
  this.totalAdmins -= 1;
  return await this.save();
};

GlobalSchema.methods.removeContributor = async function(contributor) {
  const index = this.contributors.indexOf(
    c => c._id.toString() === contributor._id.toString()
  );
  this.contributors.splice(index, 1);
  this.totalContributors -= 1;
  return await this.save();
};

GlobalSchema.methods.removeTask = async function(task) {
  const index = this.tasks.indexOf(
    c => c._id.toString() === task._id.toString()
  );
  this.tasks.splice(index, 1);
  this.totalTasks -= 1;
  return await this.save();
};

GlobalSchema.methods.removeModel = async function(model) {
  const index = this.models.indexOf(
    c => c._id.toString() === model._id.toString()
  );
  this.models.splice(index, 1);
  this.totalModels -= 1;
  return await this.save();
};

GlobalSchema.post("findOne", async function(doc, next) {
  const keys = ["contributorsActivity", "tasksActivity", "modelsActivity"];
  return await updateActivities(doc, next, keys);
});

GlobalSchema.pre("save", async function(next) {
  this.wasNew = this.isNew;
  next();
});

GlobalSchema.post("save", async function(doc, next) {
  if (!this.wasNew) return next();

  doc.adminsActivity = createActivity(5);
  doc.contributorsActivity = createActivity(5);
  doc.tasksActivity = createActivity(5);
  doc.modelsActivity = createActivity(5);

  return await doc.save();
});

module.exports = mongoose.model("Global", GlobalSchema);
