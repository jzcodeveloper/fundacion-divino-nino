const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/error");

const Question = require("../models/Question");
const Counter = require("../models/Counter");
const Dataset = require("../models/Dataset");
const Model = require("../models/Model");
const Admin = require("../models/Admin");
const Data = require("../models/Data");
const Task = require("../models/Task");
const Log = require("../models/Log");

// @desc      Returns all Tasks
// @route     GET /api/tasks
// @access    Admin
exports.getTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find({});

  res.status(200).json({ success: true, data: tasks });
});

// @desc      Returns a Task
// @route     GET /api/tasks/:id
// @access    Admin
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) return next(new ErrorResponse("This task does not exist", 404));

  res.status(200).json({ success: true, data: task });
});

// @desc      Creates a Task
// @route     POST /api/tasks
// @access    Admin
exports.createTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findOne({ title: req.body.title });

  if (task) return next(new ErrorResponse("This task already exists", 400));

  // Create questions
  const questions = await Question.create(req.body.questions);
  const opts = { new: true };

  req.body.admin = req.user._id;
  req.body.questions = questions.map((question) => question._id);

  // Create task
  task = await Task.create(req.body);

  // Create dataset
  const dataset = await Dataset.create({
    task: task._id,
    title: task.title + " (Dataset)",
  });

  const update = { dataset: dataset._id };

  // Update and populate the task
  task = await Task.findByIdAndUpdate(task._id, update, opts);

  // Update admin tasks
  const admin = await Admin.findById(req.user._id);

  await admin.updateTasks(task);

  Admin.updateLogs({
    action: "Creación",
    message: `¡Has creado una tarea con el título "${task.title}"!`,
    createdBy: req.user._id,
  });

  res.status(201).json({ success: true, data: { admin, task } });
});

// @desc      Updates a Task
// @route     PUT /api/tasks/:id
// @access    Admin
exports.updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) return next(new ErrorResponse("This task does not exist", 404));

  for (const question of req.body.questions) {
    const { _id, ...update } = question;
    await Question.findByIdAndUpdate(_id, update);
  }

  delete req.body.questions;

  const opts = { new: true, runValidators: true };

  task = await Task.findByIdAndUpdate(task._id, req.body, opts);

  // Update dataset title
  const update = { title: req.body.title + " (Dataset)" };
  const dataset = await Dataset.findByIdAndUpdate(task.dataset, update, opts);

  Admin.updateLogs({
    action: "Actualización",
    message: `¡Has actualizado la tarea "${task.title}"!`,
    createdBy: req.user._id,
  });

  res.status(200).json({ success: true, data: { task, dataset } });
});

// @desc      Deletes a Task
// @route     DELETE /api/tasks/:id
// @access    Admin
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) return next(new ErrorResponse("This task does not exist", 404));

  Admin.updateLogs({
    action: "Eliminación",
    message: `¡Has eliminado la tarea "${task.title}"!`,
    createdBy: req.user._id,
  });

  res.status(200).json({ success: true, data: task });
});

// @desc      Disables a Task
// @route     PUT /api/tasks/:id
// @access    Admin
exports.disableTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) return next(new ErrorResponse("This task does not exist", 404));

  const fields = { enabled: !task.enabled };

  task = await Task.findByIdAndUpdate(task._id, fields, {
    new: true,
    runValidators: true,
  });

  Admin.updateLogs({
    action: "Visibilidad",
    message: `¡Has ${
      fields.enabled ? "habilitado" : "deshabilitado"
    } la tarea "${task.title}"!`,
    createdBy: req.user._id,
  });

  res.status(200).json({ success: true, data: task });
});
