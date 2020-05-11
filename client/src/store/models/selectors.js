import { createSelector } from "reselect";

const modelsState = state => state.models;

export const selectModels = createSelector(
  [modelsState],
  models => models.models
);

export const selectTraining = createSelector(
  [modelsState],
  models => models.training
);

export const selectTesting = createSelector(
  [modelsState],
  models => models.testing
);

export const selectError = createSelector(
  [modelsState],
  models => models.error
);

export const selectLoading = createSelector(
  [modelsState],
  models => models.loading
);

export const selectModel = _id =>
  createSelector([selectModels], models =>
    models.find(model => model._id === _id)
  );
