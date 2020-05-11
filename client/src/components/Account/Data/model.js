const strInput = (value) => ({
  value: value,
  validation: [true, ""],
  validators: {
    required: [true, "Por favor, rellena este campo."],
  },
});

export default (admin) => ({
  degree: strInput(admin.degree),
  username: strInput(admin.username),
  email: strInput(admin.email),
});
