const strInput = (value) => ({
  value: value,
  validation: [true, ""],
  validators: {
    required: [true, "Por favor, rellena este campo."],
  },
});

export default Object.freeze({
  username: strInput("@Javier"),
  email: strInput("javier_bislip@hotmail.com"),
  password: strInput("123456"),
});
