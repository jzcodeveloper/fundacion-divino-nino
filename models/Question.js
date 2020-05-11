const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please add a question"],
    trim: true,
    maxlength: [200, "Question can not be more than 200 characters"],
  },

  feature: {
    type: String,
    required: [true, "Please add a feature name"],
    trim: true,
    maxlength: [50, "Feature can not be more than 50 characters"],
  },

  answers: {
    type: [String],
    required: [true, "Please add an array of labels"],
    trim: true,
    maxlength: [50, "Answer can not be more than 50 characters"],
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
