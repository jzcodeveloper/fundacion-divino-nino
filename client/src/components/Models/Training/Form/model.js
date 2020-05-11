const numInput = (value, min, max) => ({
  value: value,
  validation: [true, ""],
  validators: {
    min: [min, `Este número debe ser mayor o igual a ${min}.`],
    max: [max, `Este número no puede ser mayor a ${max}.`],
  },
});

export default (model) => ({
  epochs: numInput(model ? model.epochs : 50, 1, 1000),
  batchSize: numInput(model ? model.batchSize : 16, 1, 300),
  learningRate: numInput(model ? model.learningRate : 0.06, 0.01, 0.1),
});
