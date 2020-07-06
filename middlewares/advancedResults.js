const mongoose = require("mongoose");
const _ = require("lodash");

const advancedResults = () => async (req, res, next) => {
  let query = null;

  // Get model
  const model = mongoose.model(req.query.model);

  // Copy req.query
  const queryObj = { ...req.query };

  // Fields to exclude
  const removeFields = ["model", "populate", "select", "sort", "page", "limit"];

  // Remove fields from query
  removeFields.forEach((param) => delete queryObj[param]);

  // Stringify the query
  let queryStr = JSON.stringify(queryObj);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in|regex)\b/g,
    (match) => `$${match}`
  );

  // Parse the query
  queryStr = JSON.parse(queryStr);

  // Add i options to regex operator
  for (const key in queryStr) {
    const keys = Object.keys(queryStr[key]);
    for (const index in keys) {
      if (keys[index] === "$regex") queryStr[key]["$options"] = "i";
    }
  }

  // Finding resource
  query = model.find(queryStr);

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Pagination
  const page = parseInt(req.query.page, 20) || 1;
  const limit = parseInt(req.query.limit, 20) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Populate
  if (req.query.populate) {
    // eg: fields,permissions.role
    const fields = req.query.populate.split(",");

    const populations = fields.reduce((acc, val, idx) => {
      // eg: permissions.role
      const subfields = val.split(".");

      if (subfields.length === 1) {
        acc.push({ path: subfields[0] });
      } else if (subfields.length === 2) {
        acc.push({ path: subfields[0], populate: { path: subfields[1] } });
      }
      return acc;
    }, []);

    query = query.populate(populations);
  }

  // Execute query
  let results = await query;

  // Sort
  let sortBy = [];

  if (req.query.sort) {
    sortBy = req.query.sort.split(",");
  } else {
    sortBy = ["updated_at desc"];
  }

  const [keys, orders] = sortBy.reduce(
    (acc, val) => {
      acc[0].push(val.split(" ")[0]);
      acc[1].push(val.split(" ")[1]);
      return acc;
    },
    [[], []]
  );

  results = _.orderBy(results, keys, orders);

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    data: { total, page, results, pagination },
  };

  next();
};

module.exports = advancedResults;
