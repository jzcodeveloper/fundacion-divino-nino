import { types } from "./types";

// Fetch a single task
export const fetchTaskRequest = id => ({
  type: types.FETCH_TASK_REQUEST,
  id
});

export const fetchTaskSuccess = payload => ({
  type: types.FETCH_TASK_SUCCESS,
  payload
});

export const fetchTaskFailure = payload => ({
  type: types.FETCH_TASK_FAILURE,
  payload
});

// Reset task state
export const resetTaskRequest = () => ({
  type: types.RESET_TASK_REQUEST
});
