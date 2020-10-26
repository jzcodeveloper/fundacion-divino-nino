const Counter = require("../models/counter");

exports.getSeries = async (_id) => {
  const query = { _id };
  const counter = await Counter.findById(query);
  return counter;
};

exports.createSeries = async (_id) => {
  const query = { _id };
  const counter = await Counter.create(query);
  return counter;
};

exports.updateSeries = async (_id) => {
  const query = { $inc: { seq: 1 } };
  const opts = { new: true };
  const counter = await Counter.findByIdAndUpdate(_id, query, opts);
  return counter;
};
