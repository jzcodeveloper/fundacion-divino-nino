const Log = require("../models/Log");
const { difference } = require("./diff");

exports.logs = schema => {
  let prev = {};
  let curr = {};

  schema.post("init", function(doc) {
    curr = doc.toObject();
  });

  schema.pre("save", function(next) {
    prev = this.toObject({ transform: false });
    next();
  });

  schema.methods.log = function(data) {
    /* data.diff = difference(prev, curr); */

    return Log.create(data);
  };
};
