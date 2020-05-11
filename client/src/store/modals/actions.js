import { types } from "./types";

// Show task form
export const showTaskFormRequest = (id) => ({
  type: types.SHOW_TASK_FORM_REQUEST,
  payload: id,
});

// Hide task form
export const hideTaskFormRequest = () => ({
  type: types.HIDE_TASK_FORM_REQUEST,
});

// Show task view
export const showTaskViewRequest = (id) => ({
  type: types.SHOW_TASK_VIEW_REQUEST,
  payload: id,
});

// Hide task view
export const hideTaskViewRequest = () => ({
  type: types.HIDE_TASK_VIEW_REQUEST,
});

// Show task disable warning
export const showTaskDisableWarningRequest = (id) => ({
  type: types.SHOW_TASK_DISABLE_WARNING_REQUEST,
  payload: id,
});

// Hide task disable warning
export const hideTaskDisableWarningRequest = () => ({
  type: types.HIDE_TASK_DISABLE_WARNING_REQUEST,
});

// Show task delete warning
export const showTaskDeleteWarningRequest = (id) => ({
  type: types.SHOW_TASK_DELETE_WARNING_REQUEST,
  payload: id,
});

// Hide task delete warning
export const hideTaskDeleteWarningRequest = () => ({
  type: types.HIDE_TASK_DELETE_WARNING_REQUEST,
});

// Show model form
export const showModelFormRequest = (id) => ({
  type: types.SHOW_MODEL_FORM_REQUEST,
  payload: id,
});

// Hide model form
export const hideModelFormRequest = () => ({
  type: types.HIDE_MODEL_FORM_REQUEST,
});

// Show model view
export const showModelViewRequest = (id) => ({
  type: types.SHOW_MODEL_VIEW_REQUEST,
  payload: id,
});

// Hide model view
export const hideModelViewRequest = () => ({
  type: types.HIDE_MODEL_VIEW_REQUEST,
});

// Show model training view
export const showModelTrainingViewRequest = (id) => ({
  type: types.SHOW_MODEL_TRAINING_VIEW_REQUEST,
  payload: id,
});

// Hide model training view
export const hideModelTrainingViewRequest = () => ({
  type: types.HIDE_MODEL_TRAINING_VIEW_REQUEST,
});

// Show model testing view
export const showModelTestingViewRequest = (id) => ({
  type: types.SHOW_MODEL_TESTING_VIEW_REQUEST,
  payload: id,
});

// Hide model testing view
export const hideModelTestingViewRequest = () => ({
  type: types.HIDE_MODEL_TESTING_VIEW_REQUEST,
});

// Show model delete warning
export const showModelDeleteWarningRequest = (id) => ({
  type: types.SHOW_MODEL_DELETE_WARNING_REQUEST,
  payload: id,
});

// Hide model delete warning
export const hideModelDeleteWarningRequest = () => ({
  type: types.HIDE_MODEL_DELETE_WARNING_REQUEST,
});

// Show dataset view
export const showDatasetViewRequest = (id) => ({
  type: types.SHOW_DATASET_VIEW_REQUEST,
  payload: id,
});

// Hide dataset view
export const hideDatasetViewRequest = () => ({
  type: types.HIDE_DATASET_VIEW_REQUEST,
});

// Show dataset download
export const showDatasetDownloadRequest = (id) => ({
  type: types.SHOW_DATASET_DOWNLOAD_REQUEST,
  payload: id,
});

// Hide dataset download
export const hideDatasetDownloadRequest = () => ({
  type: types.HIDE_DATASET_DOWNLOAD_REQUEST,
});

// Show dataset split warning
export const showDatasetSplitWarningRequest = (id) => ({
  type: types.SHOW_DATASET_SPLIT_WARNING_REQUEST,
  payload: id,
});

// Hide dataset split warning
export const hideDatasetSplitWarningRequest = () => ({
  type: types.HIDE_DATASET_SPLIT_WARNING_REQUEST,
});

// Show dataset empty warning
export const showDatasetEmptyWarningRequest = (id) => ({
  type: types.SHOW_DATASET_EMPTY_WARNING_REQUEST,
  payload: id,
});

// Hide dataset empty warning
export const hideDatasetEmptyWarningRequest = () => ({
  type: types.HIDE_DATASET_EMPTY_WARNING_REQUEST,
});
