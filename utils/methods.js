const Counter = require("../models/Counter");
const { createActivity, mergeActivities } = require("./dates");

exports.generateId = async key => {
  const query = { $inc: { seq: 1 } };
  const opts = { new: true };
  const counter = await Counter.findByIdAndUpdate(key, query, opts);
  return counter.seq;
};

exports.updateActivities = async (doc, next, keys) => {
  if (!doc) return next();

  if (Array.isArray(doc)) {
    if (!doc[0]) return next();

    keys.forEach(key => {
      if (!doc[0][key]) return next();
    });

    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < doc.length; j++) {
        if (!doc[j].toObject) return next();

        if (doc[j][keys[i]].length === 0) doc[j][keys[i]] = createActivity(5);
        else doc[j][keys[i]] = mergeActivities(doc[j].toObject()[keys[i]]);

        await doc[j].save();
      }
    }
  } else {
    keys.forEach(key => {
      if (!doc[key]) return next();
    });

    for (let i = 0; i < keys.length; i++) {
      if (doc[keys[i]].length === 0) doc[keys[i]] = createActivity(5);
      else doc[keys[i]] = mergeActivities(doc.toObject()[keys[i]]);

      await doc.save();
    }
  }
};
