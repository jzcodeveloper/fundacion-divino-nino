const numInput = (value, min, max) => ({
  value: value,
  validation: [true, ""],
  validators: {
    min: [min, `Este número debe ser mayor o igual a ${min}.`],
    max: [max, `Este número no puede ser mayor a ${max}.`],
  },
});

export default (model) => ({
  batchSize: numInput(model ? model.batchSize : 16, 1, 300),
});
