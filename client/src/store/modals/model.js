export const initialState = Object.freeze({
  task: {
    id: undefined,
    taskForm: false,
    taskView: false,
    disableWarning: false,
    deleteWarning: false,
  },
  model: {
    id: undefined,
    modelForm: false,
    modelView: false,
    trainingView: false,
    testingView: false,
    deleteWarning: false,
  },
  dataset: {
    id: undefined,
    datasetView: false,
    splitWarning: false,
    emptyWarning: false,
    download: false,
  },
});
