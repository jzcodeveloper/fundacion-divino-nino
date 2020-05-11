const strInput = (value) => ({
  value: value,
  validation: [true, ""],
  validators: {
    required: [true, "Por favor, rellena este campo."],
  },
});

export default Object.freeze({
  password: strInput(""),
  password2: strInput(""),
});
