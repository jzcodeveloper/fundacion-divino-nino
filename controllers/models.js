const TF = require("../ml-models/tfjs");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/error");
const { parseCSV } = require("../utils/csv");
const { mkdir, writeFile } = require("fs").promises;

const Admin = require("../models/Admin");
const Model = require("../models/Model");
const Log = require("../models/Log");

// @desc      Returns all Models
// @route     GET /api/models
// @access    Admin
exports.getModels = asyncHandler(async (req, res, next) => {
  const models = await Model.find({});

  res.status(200).json({ success: true, data: models });
});

// @desc      Returns a Model
// @route     GET /api/models/:id
// @access    Admin
exports.getModel = asyncHandler(async (req, res, next) => {
  const model = await Model.findById(req.params.id);

  if (!model) return next(new ErrorResponse("This model does not exist", 404));

  res.status(200).json({ success: true, data: model });
});

// @desc      Creates a Model
// @route     PUT /api/models/:id
// @access    Admin
exports.createModel = asyncHandler(async (req, res, next) => {
  let model = await Model.findById(req.params.id);

  if (model) return next(new ErrorResponse("This model already exists.", 400));

  model = await Model.create(req.body);

  // Update admin model
  let admin = await Admin.findById(req.user._id);

  admin = await admin.updateModels(model);

  Admin.updateLogs({
    action: "Creación",
    message: `¡Has creado el modelo "${model.title}"!`,
    createdBy: req.user._id,
  });

  res.status(201).json({ success: true, data: { admin, model } });
});

// @desc      Updates a Model
// @route     PUT /api/models/:id
// @access    Admin
exports.updateModel = asyncHandler(async (req, res, next) => {
  const model = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!model) return next(new ErrorResponse("This model does not exist", 404));

  Admin.updateLogs({
    action: "Actualización",
    message: `¡Has actualizado el modelo "${model.title}"!`,
    createdBy: req.user._id,
  });

  res.status(200).json({ success: true, data: model });
});

// @desc      Deletes a Model
// @route     PUT /api/models/:id
// @access    Admin
exports.deleteModel = asyncHandler(async (req, res, next) => {
  const model = await Model.findByIdAndDelete(req.params.id);

  if (!model) return next(new ErrorResponse("This model does not exist", 404));

  Admin.updateLogs({
    action: "Eliminación",
    message: `¡Has eliminado el modelo "${model.title}"!`,
    createdBy: req.user._id,
  });

  res.status(200).json({ success: true, data: model });
});

// @desc      Trains a Model
// @route     PUT /api/models/:id/train
// @access    Admin
exports.trainModel = asyncHandler(async (req, res, next) => {
  let model = await Model.findById(req.params.id);

  if (!model) return next(new ErrorResponse("This model does not exist", 404));

  const { buffer } = req.file || {};

  if (!buffer) return next(new ErrorResponse("No file was uploaded", 400));

  const dir = `files/temp`;

  await mkdir(dir, { recursive: true });

  await writeFile(`${dir}/dataset.csv`, buffer, "binary");

  model = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });

  const parsed = await parseCSV(`${dir}/dataset.csv`);

  model.dataset = parsed;

  model = await model.updateLabels(TF.getLabels(model.dataset));

  const data = await TF.trainModel(model);

  const acc = data.history.acc[data.history.acc.length - 1];

  model = await model.updateTraining(acc);

  Admin.updateLogs({
    action: "Entrenamiento",
    message: `¡Has entrenado el modelo "${model.title}"!`,
    createdBy: req.user._id,
  });

  res.status(200).json({ success: true, data: model });
});

// @desc      Tests a Model
// @route     GET /api/models/:id/test
// @access    Admin
exports.testModel = asyncHandler(async (req, res, next) => {
  let model = await Model.findById(req.params.id);

  if (!model) return next(new ErrorResponse("This model does not exist", 404));

  const { buffer } = req.file || {};

  if (!buffer) return next(new ErrorResponse("No file was uploaded", 400));

  const dir = `files/temp`;

  await mkdir(dir, { recursive: true });

  await writeFile(`${dir}/dataset.csv`, buffer, "binary");

  model = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });

  const parsed = await parseCSV(`${dir}/dataset.csv`);

  model.dataset = parsed;

  const data = await TF.testModel(model);

  model = await model.updateTesting();

  Admin.updateLogs({
    action: "Evaluación",
    message: `¡Has evaluado el modelo "${model.title}"!`,
    createdBy: req.user._id,
  });

  res.status(200).json({ success: true, data: model });
});
