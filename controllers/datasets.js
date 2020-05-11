const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/error");
const { writeCSV } = require("../utils/csv");

const Task = require("../models/Task");
const Data = require("../models/Data");
const Dataset = require("../models/Dataset");
const Contributor = require("../models/Contributor");

// @desc      Returns all Datasets
// @route     GET /api/datasets
// @access    Admin
exports.getDatasets = asyncHandler(async (req, res, next) => {
  const datasets = await Dataset.find({});

  res.status(200).json({ success: true, data: datasets });
});

// @desc      Returns a -Dataset
// @route     GET /api/datasets/:id
// @access    Admin
exports.getDataset = asyncHandler(async (req, res, next) => {
  const dataset = await Dataset.findById(req.params.id);

  if (!dataset)
    return next(new ErrorResponse("This dataset does not exist", 404));

  res.status(200).json({ success: true, data: dataset });
});

// @desc      Add new Data to a Dataset and update all Models
// @route     PUT /api/datasets/:id/add
// @access    Admin
exports.createData = asyncHandler(async (req, res, next) => {
  req.body.dataset = req.params.id;

  let dataset = await Dataset.findById(req.params.id);
  let contributor = await Contributor.findById(req.user._id);
  let task = await Task.findById(req.body.task);

  if (!dataset)
    return next(new ErrorResponse("This dataset does not exist", 404));

  const data = await Data.create(req.body);

  // Update Dataset model
  dataset = await dataset.updateDataset(data);
  dataset = await dataset.updateDatasets();

  // Update Task model
  task = await task.updateHistory(data);
  task = await task.updateGlobalStats();

  // Update Contributor model
  contributor = await contributor.updateHistory(data, task);
  contributor = await contributor.updateGlobalStats(data);

  res.status(200).json({ success: true, data: { contributor } });
});

// @desc      Updates a Dataset split ratio
// @route     PUT /api/datasets/:id/ratio
// @access    Admin
exports.updateRatio = asyncHandler(async (req, res, next) => {
  let dataset = await Dataset.findById(req.params.id);

  if (!dataset)
    return next(new ErrorResponse("This dataset does not exist", 404));

  dataset = await dataset.updateSplitRatio(req.body.ratio);
  dataset = await dataset.updateDatasets();

  res.status(200).json({ success: true, data: dataset });
});

// @desc      Empty a Dataset
// @route     GET /api/datasets/:id/reset
// @access    Admin
exports.emptyDataset = asyncHandler(async (req, res, next) => {
  let dataset = await Dataset.findById(req.params.id);

  if (!dataset)
    return next(new ErrorResponse("This dataset does not exist", 404));

  dataset = await dataset.emptyDataset();
  dataset = await dataset.updateDatasets();

  res.status(200).json({ success: true, data: dataset });
});

// @desc      Exports Dataset as CSV format
// @route     GET /api/datasets/:id/export
// @access    Admin
exports.exportDataset = asyncHandler(async (req, res, next) => {
  let dataset = await Dataset.findById(req.params.id);

  if (!dataset)
    return next(new ErrorResponse("This dataset does not exist", 404));

  const dir = `files/temp`;
  const file1 = `${dir}/dataset.csv`;
  const file2 = `${dir}/dataset_training.csv`;
  const file3 = `${dir}/dataset_testing.csv`;

  await writeCSV(file1, dataset.dataset);
  await writeCSV(file2, dataset.trainingDataset);
  await writeCSV(file3, dataset.testingDataset);

  res.zip([
    { path: file1, name: file1.split("/")[2] },
    { path: file2, name: file2.split("/")[2] },
    { path: file3, name: file3.split("/")[2] },
  ]);
});
