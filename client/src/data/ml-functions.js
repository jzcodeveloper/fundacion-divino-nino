export default {
  layers: ["dense"],
  activation: [
    "elu",
    "hardSigmoid",
    "linear",
    "relu",
    "relu6",
    "selu",
    "sigmoid",
    "softmax",
    "softplus",
    "softsign",
    "tanh"
  ],
  optimizer: [
    "sgd",
    "momentum",
    "adagrad",
    "adadelta",
    "adam",
    "adamax",
    "rmsprop"
  ],
  loss: [
    "absoluteDifference",
    "computeWeightedLoss",
    "cosineDistance",
    "hingeLoss",
    "huberLoss",
    "logLoss",
    "meanSquaredError",
    "sigmoidCrossEntropy",
    "softmaxCrossEntropy"
  ]
};
