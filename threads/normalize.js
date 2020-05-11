const { workerData, parentPort } = require("worker_threads");

(() => {
  const { inputData, outputData, normalizationData } = workerData;
  const { inputMax, inputMin, outputMax, outputMin } = normalizationData;

  const inputTensor = inputData.sub(inputMin).div(inputMax.sub(inputMin));
  const outputTensor = outputData.sub(outputMin).div(outputMax.sub(outputMin));

  parentPort.postMessage({ inputTensor, outputTensor });
})();
