import { createSelector } from "reselect";

export const modalsState = (state) => state.modals;

export const selectTask = createSelector(
  [modalsState],
  (modals) => modals.task
);

export const selectModel = createSelector(
  [modalsState],
  (modals) => modals.model
);

export const selectDataset = createSelector(
  [modalsState],
  (modals) => modals.dataset
);

// Task modals
export const selectTaskId = createSelector([selectTask], (task) => task.id);

export const selectTaskForm = createSelector(
  [selectTask],
  (task) => task.taskForm
);

export const selectTaskView = createSelector(
  [selectTask],
  (task) => task.taskView
);

export const selectTaskDisableWarning = createSelector(
  [selectTask],
  (task) => task.disableWarning
);

export const selectTaskDeleteWarning = createSelector(
  [selectTask],
  (task) => task.deleteWarning
);

// Model modals
export const selectModelId = createSelector([selectModel], (model) => model.id);

export const selectModelForm = createSelector(
  [selectModel],
  (model) => model.modelForm
);

export const selectModelView = createSelector(
  [selectModel],
  (model) => model.modelView
);

export const selectModelTrainingView = createSelector(
  [selectModel],
  (model) => model.trainingView
);

export const selectModelTestingView = createSelector(
  [selectModel],
  (model) => model.testingView
);

export const selectModelDeleteWarning = createSelector(
  [selectModel],
  (model) => model.deleteWarning
);

// Dataset modals
export const selectDatasetId = createSelector(
  [selectDataset],
  (dataset) => dataset.id
);

export const selectDatasetView = createSelector(
  [selectDataset],
  (dataset) => dataset.datasetView
);

export const selectDatasetDownload = createSelector(
  [selectDataset],
  (dataset) => dataset.download
);

export const selectDatasetSplitWarning = createSelector(
  [selectDataset],
  (dataset) => dataset.splitWarning
);

export const selectDatasetEmptyWarning = createSelector(
  [selectDataset],
  (dataset) => dataset.emptyWarning
);
