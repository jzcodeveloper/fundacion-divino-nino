import { types } from "./types";

// Fetch a single dataset
export const fetchDatasetRequest = id => ({
  type: types.FETCH_DATASET_REQUEST,
  id
});

export const fetchDatasetSuccess = payload => ({
  type: types.FETCH_DATASET_SUCCESS,
  payload
});

export const fetchDatasetFailure = payload => ({
  type: types.FETCH_DATASET_FAILURE,
  payload
});

// Reset dataset state
export const resetDatasetRequest = () => ({
  type: types.RESET_DATASET_REQUEST
});
