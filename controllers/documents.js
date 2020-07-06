const mongoose = require("mongoose");
const crypto = require("crypto");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/error");
const { getSeries, createSeries, updateSeries } = require("../utils/methods");

/**
 * @desc   Get multiple documents
 * @route  GET /api/documents/
 * @access Private
 */
exports.fetchDocuments = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * @desc   Create multiple documents
 * @route  POST /api/documents/
 * @access Private
 */
exports.createDocuments = asyncHandler(async (req, res, next) => {
  // eg: User schema
  const model = mongoose.model(req.query.model);

  for (const doc of req.body) {
    // Created by
    doc.created_by = req.user.username;

    // Generate name for parent doc
    if (!doc.name) {
      const doctype = await mongoose
        .model("DocType")
        .findOne({ name: req.query.model });

      // autoname config
      const autoname = doctype.autoname.split(":");

      if (autoname[0] === "hash") {
        doc.name = crypto.randomBytes(16).toString("hex");
      }

      if (autoname[0] === "fields") {
        const field = autoname[1];
        doc.name = doc[field];
      }

      if (autoname[0] === "naming_series") {
        const series = autoname[1];

        let counter = await getSeries(series);
        if (!counter) counter = await createSeries(series);

        const _id = counter._id.replace(".YYYY.", new Date().getFullYear());
        const seq = ("00000" + counter.seq.toString()).substr(
          counter.seq.toString().length
        );

        doc.name = _id + seq;
        await updateSeries(series);
      }
    }

    // Create sub documents
    if (req.query.subfields && req.query.submodels) {
      const subfields = req.query.subfields.split(",");
      const submodels = req.query.submodels.split(",");

      for (const index in subfields) {
        const subfield = subfields[index];
        const submodel = mongoose.model(submodels[index]);

        const parent = {
          parent_model: req.query.model,
          parent_name: doc.name,
        };

        const objects = doc[subfield].map((object) => ({
          ...object,
          ...parent,
          name: crypto.randomBytes(16).toString("hex"),
        }));

        const subdocuments = await submodel.create(objects);

        if (subdocuments)
          doc[subfield] = subdocuments.map((subdoc) => subdoc._id);
      }
    }
  }

  // Create documents
  const result = await model.create(req.body);

  res.status(200).json({ success: true, data: result });
});

/**
 * @desc   Update multiple documents
 * @route  GET /api/documents/
 * @access Private
 */
exports.updateDocuments = asyncHandler(async (req, res, next) => {
  // eg: User schema
  const model = mongoose.model(req.query.model);

  for (const doc of req.body) {
    // Updated by
    doc.updated_by = req.user.username;
    // Get name from query or from doc
    const name = req.query.name || doc.name;

    // Subdocuments
    if (req.query.subfields && req.query.submodels) {
      const subfields = req.query.subfields.split(",");
      const submodels = req.query.submodels.split(",");

      for (const index in subfields) {
        const subfield = subfields[index];
        const submodel = mongoose.model(submodels[index]);

        const parent = {
          parent_model: req.query.model,
          parent_name: name,
        };

        // Delete sub documents
        await submodel.deleteMany(parent);

        // Re-shape objects
        const objects = doc[subfield].map((object) => ({
          ...object,
          ...parent,
          name: crypto.randomBytes(16).toString("hex"),
        }));

        // Re-create sub documents
        const subdocuments = await submodel.create(objects);

        if (subdocuments)
          doc[subfield] = subdocuments.map((subdoc) => subdoc._id);
      }
    }

    const opts = { new: true, runValidators: true };
    const result = await model.findOneAndUpdate({ name }, doc, opts);
  }

  res.status(200).json({ success: true, data: req.body });
});

/**
 * @desc   Delete multiple documents
 * @route  GET /api/documents/?model=Model&subfields=field1,field2&submodels=Model1,Model2
 * @access Private
 */
exports.deleteDocuments = asyncHandler(async (req, res, next) => {
  const model = mongoose.model(req.query.model);

  const result = await model.deleteMany({ _id: req.body.ids });

  if (req.query.subfields && req.query.submodels) {
    const subfields = req.query.subfields.split(",");
    const submodels = req.query.submodels.split(",");

    for (const submodel of submodels) {
      await mongoose.model(submodel).deleteMany({
        parent_model: req.query.model,
        parent_name: req.body.names,
      });
    }
  }

  res.status(200).json({ success: true, data: result });
});
