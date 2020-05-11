const tf = require("@tensorflow/tfjs-node");
const fs = require("fs").promises;
const os = require("os");
const io = require("../../socket");

class Model {
  async buildModel({
    inputShape,
    layers,
    optimizer,
    loss,
    epochs,
    batchSize,
    learningRate,
    labels,
  }) {
    this._model = tf.sequential();

    layers.forEach((layer, i) => {
      if (i === 0) {
        this._model.add(
          tf.layers[layer.class]({
            inputShape: [inputShape], // Variable - Depends on how many features there are
            units: layer.units, // Variable
            activation: layer.activation, // Variable
          })
        );
      } else
        this._model.add(
          tf.layers[layer.class]({
            units: layer.units, // Variable
            activation: layer.activation, // Variable
          })
        );
    });

    this._model.compile({
      optimizer: tf.train[optimizer](learningRate), // Variable
      loss, // Variable
      metrics: ["accuracy"],
    });

    this._epochs = epochs;
    this._batchSize = batchSize;
    this._labels = labels;
  }

  // Get the input and output labels from the dataset
  getLabels(dataset) {
    const labels = {};

    dataset.forEach((data, index) => {
      const keys = Object.keys(data);
      const values = Object.values(data);

      if (index === 0) keys.forEach((key) => (labels[key] = []));

      values.forEach((value, index) => {
        if (!isNaN(value)) return;

        if (!labels[keys[index]].find((e) => e === value))
          labels[keys[index]].push(value);
      });
    });

    return labels;
  }

  // Discretize data
  discretizeData(dataset) {
    const newDataset = [];

    dataset.forEach((data, index) => {
      const keys = Object.keys(data);
      const newData = Object.assign({}, data);

      keys.forEach((key) => {
        if (!isNaN(newData[key])) return;

        newData[key] = this._labels[key].reduce((acc, val, index) => {
          if (val === newData[key]) acc = index;
          return acc;
        }, 0);
      });

      newDataset.push(newData);
    });

    return newDataset;
  }

  // Data transformation
  convertData(dataset) {
    return tf.tidy(() => {
      // [[4, 4, 4, 4], [0, 0, 0, 0]]
      const inputData = tf.tensor2d(
        dataset.map((data, index) => {
          const values = Object.values(data);
          values.pop();
          return values.map((value) => value);
        })
      );

      // [[1, 0], [0, 1]]
      const outputData = tf.tensor2d(
        dataset.map((data, index) => {
          const keys = Object.keys(this._labels);
          const values = Object.values(data);
          const last = values[values.length - 1];
          return this._labels[keys[keys.length - 1]].map((label, index) => {
            if (isNaN(last)) return label === last ? 1 : 0;
            else return index === last ? 1 : 0;
          });
        })
      );

      // Min-max scaling
      const inputMax = inputData.max();
      const inputMin = inputData.min();
      const outputMax = outputData.max();
      const outputMin = outputData.min();

      // Normalization
      const normalizationData = { inputMax, inputMin, outputMax, outputMin };

      // Normalize the data
      const inputTensor = inputData.sub(inputMin).div(inputMax.sub(inputMin));
      const outputTensor = outputData
        .sub(outputMin)
        .div(outputMax.sub(outputMin));

      return { inputTensor, outputTensor, normalizationData };
    });
  }

  // Training
  async trainModel(model) {
    await this.buildModel(model);

    const { dataset } = model;

    const discretizedData = this.discretizeData(dataset);

    const { inputTensor, outputTensor } = this.convertData(discretizedData);

    const training = await this._model.fit(inputTensor, outputTensor, {
      epochs: this._epochs,
      batchSize: this._batchSize,
      callbacks: {
        onEpochEnd: (epoch, { loss, acc }) => {
          const lossLog = {
            date: new Date(),
            epoch: epoch,
            metric: "Error",
            value: loss,
          };

          const accLog = {
            date: new Date(),
            metric: "Confianza",
            epoch: epoch,
            value: acc,
          };

          if (epoch % 10 === 0)
            io.getIO().emit("training", { epoch, loss, acc, lossLog, accLog });
        },
      },
    });

    // Get the weights of the model [0] = kernel [1] = bias
    /* this._model.layers[0].getWeights()[0].print();
    this._model.layers[0].getWeights()[1].print(); */

    // Model should be saved in this line
    await this._model.save(`file://${file}`);

    return training;
  }

  // Testing
  async testModel(model) {
    // Model should be loaded in this line
    await tf.loadLayersModel(`file://${file}/model.json`);

    const { dataset } = model;

    const discretizedData = this.discretizeData(dataset);

    const { inputTensor, normalizationData } = this.convertData(
      discretizedData
    );

    const { inputMax, inputMin, outputMax, outputMin } = normalizationData;

    const outputTensor = await this._model.predict(inputTensor, {
      batchSize: this._batchSize,
    });

    // Un-normalize the data
    const inputData = inputTensor.mul(inputMax.sub(inputMin)).add(inputMin);
    const outputData = outputTensor
      .mul(outputMax.sub(outputMin))
      .add(outputMin);

    // Predictions
    const predictions = await outputData.data();

    io.getIO().emit("testing", { dataset, predictions });

    return predictions;
  }
}

module.exports = new Model();
