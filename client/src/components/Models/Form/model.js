const strInput = (value) => ({
  value: value,
  validation: [true, ""],
  validators: {
    required: [true, "Por favor, rellena este campo."],
  },
});

const numInput = (value, min) => ({
  value: value,
  validation: [true, ""],
  validators: {
    min: [min, `Este número debe ser mayor o igual a ${min}.`],
  },
});

export default (model) => ({
  //
  title: strInput(model ? model.title : ""),
  //
  inputShape: numInput(model ? model.inputShape : 2, 2),
  //
  layers: model
    ? model.layers.map((layer) => ({
        type: strInput(layer.class),
        units: numInput(layer.units, 1),
        activation: strInput(layer.activation),
      }))
    : [
        {
          type: strInput("dense"),
          units: numInput(5, 1),
          activation: strInput("sigmoid"),
        },
        {
          type: strInput("dense"),
          units: numInput(5, 1),
          activation: strInput("sigmoid"),
        },
        {
          type: strInput("dense"),
          units: numInput(5, 1),
          activation: strInput("sigmoid"),
        },
      ],
  //
  functions: [
    {
      optimizer: strInput(model ? model.optimizer : "adam"),
      loss: strInput(model ? model.loss : "meanSquaredError"),
    },
  ],
});
