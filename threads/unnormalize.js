const { workerData, parentPort } = require("worker_threads");

(() => {
  const { inputTensor, outputTensor, normalizationData } = workerData;
  const { inputMax, inputMin, outputMax, outputMin } = normalizationData;

  const inputData = inputTensor.mul(inputMax.sub(inputMin)).add(inputMin);
  const outputData = outputTensor.mul(outputMax.sub(outputMin)).add(outputMin);

  parentPort.postMessage({ inputData, outputData });
})();
