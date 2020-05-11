const strInput = (value) => ({
  value: value,
  validation: [true, ""],
  validators: {
    required: [true, "Por favor, rellena este campo."],
  },
});

export default (task) => ({
  //
  title: strInput(task ? task.title : ""),
  //
  description: strInput(task ? task.description : ""),
  //
  questions: task
    ? task.questions.map(({ question, feature, answers }) => ({
        question: strInput(question),
        feature: strInput(feature),
        answers: strInput(answers.join(",")),
      }))
    : [
        {
          question: strInput(""),
          feature: strInput(""),
          answers: strInput(""),
        },
      ],
  //
  tips: task ? task.tips.map((tip) => strInput(tip)) : [strInput("")],
});
