import { types } from "./types";

// Fetch all datasets
export const fetchDatasetsRequest = () => ({
  type: types.FETCH_DATASETS_REQUEST
});

export const fetchDatasetsSuccess = data => ({
  type: types.FETCH_DATASETS_SUCCESS,
  payload: data
});

export const fetchDatasetsFailure = error => ({
  type: types.FETCH_DATASETS_FAILURE,
  payload: error
});

// Updates dataset split ratio
export const updateSplitRatioRequest = (id, payload) => ({
  type: types.UPDATE_SPLIT_RATIO_REQUEST,
  id,
  payload
});

export const updateSplitRatioSuccess = data => ({
  type: types.UPDATE_SPLIT_RATIO_SUCCESS,
  payload: data
});

export const updateSplitRatioFailure = error => ({
  type: types.UPDATE_SPLIT_RATIO_FAILURE,
  payload: error
});

// Empty dataset
export const emptyDatasetRequest = id => ({
  type: types.EMPTY_DATASET_REQUEST,
  id
});

export const emptyDatasetSuccess = data => ({
  type: types.EMPTY_DATASET_SUCCESS,
  payload: data
});

export const emptyDatasetFailure = error => ({
  type: types.EMPTY_DATASET_FAILURE,
  payload: error
});

// Exports dataset as csv format
export const exportDatasetRequest = id => ({
  type: types.EXPORT_DATASET_REQUEST,
  id
});

export const exportDatasetSuccess = data => ({
  type: types.EXPORT_DATASET_SUCCESS,
  payload: data
});

export const exportDatasetFailure = error => ({
  type: types.EXPORT_DATASET_FAILURE,
  payload: error
});

// Creates data and appends it to a dataset
export const createDataRequest = (id, payload) => ({
  type: types.CREATE_DATA_REQUEST,
  id,
  payload
});

export const createDataSuccess = data => ({
  type: types.CREATE_DATA_SUCCESS,
  payload: data
});

export const createDataFailure = error => ({
  type: types.CREATE_DATA_FAILURE,
  payload: error
});
