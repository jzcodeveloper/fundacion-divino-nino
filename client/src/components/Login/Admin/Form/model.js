const strInput = (value) => ({
  value: value,
  validation: [true, ""],
  validators: {
    required: [true, "Por favor, rellena este campo."],
  },
});

export default Object.freeze({
  username: strInput("Anaylen Lopez"),
  email: strInput("anaylenlopez@hotmail.com"),
  password: strInput("123456"),
});
