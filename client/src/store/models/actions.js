import { types } from "./types";

// Fetch all models
export const fetchModelsRequest = () => ({
  type: types.FETCH_MODELS_REQUEST
});

export const fetchModelsSuccess = data => ({
  type: types.FETCH_MODELS_SUCCESS,
  payload: data
});

export const fetchModelsFailure = error => ({
  type: types.FETCH_MODELS_FAILURE,
  payload: error
});

// Create a model
export const createModelRequest = payload => ({
  type: types.CREATE_MODEL_REQUEST,
  payload
});

export const createModelSuccess = payload => ({
  type: types.CREATE_MODEL_SUCCESS,
  payload
});

export const createModelFailure = payload => ({
  type: types.CREATE_MODEL_FAILURE,
  payload
});

// Updates model
export const updateModelRequest = (id, payload) => ({
  type: types.UPDATE_MODEL_REQUEST,
  id,
  payload
});

export const updateModelSuccess = data => ({
  type: types.UPDATE_MODEL_SUCCESS,
  payload: data
});

export const updateModelFailure = error => ({
  type: types.UPDATE_MODEL_FAILURE,
  payload: error
});

// Delete a single model
export const deleteModelRequest = id => ({
  type: types.DELETE_MODEL_REQUEST,
  id
});

export const deleteModelSuccess = payload => ({
  type: types.DELETE_MODEL_SUCCESS,
  payload
});

export const deleteModelFailure = payload => ({
  type: types.DELETE_MODEL_FAILURE,
  payload
});

// Trains a model
export const trainModelRequest = (id, payload) => ({
  type: types.TRAIN_MODEL_REQUEST,
  id,
  payload
});

export const trainModelSuccess = data => ({
  type: types.TRAIN_MODEL_SUCCESS,
  payload: data
});

export const trainModelFailure = error => ({
  type: types.TRAIN_MODEL_FAILURE,
  payload: error
});

// Tests a model
export const testModelRequest = (id, payload) => ({
  type: types.TEST_MODEL_REQUEST,
  id,
  payload
});

export const testModelSuccess = data => ({
  type: types.TEST_MODEL_SUCCESS,
  payload: data
});

export const testModelFailure = error => ({
  type: types.TEST_MODEL_FAILURE,
  payload: error
});
