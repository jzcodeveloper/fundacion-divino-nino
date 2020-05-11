import { types } from "./types";

// Create a task
export const createTaskRequest = payload => ({
  type: types.CREATE_TASK_REQUEST,
  payload
});

export const createTaskSuccess = payload => ({
  type: types.CREATE_TASK_SUCCESS,
  payload
});

export const createTaskFailure = payload => ({
  type: types.CREATE_TASK_FAILURE,
  payload
});

// Update a single task
export const updateTaskRequest = (id, payload) => ({
  type: types.UPDATE_TASK_REQUEST,
  id,
  payload
});

export const updateTaskSuccess = payload => ({
  type: types.UPDATE_TASK_SUCCESS,
  payload
});

export const updateTaskFailure = payload => ({
  type: types.UPDATE_TASK_FAILURE,
  payload
});

// Delete a single task
export const deleteTaskRequest = id => ({
  type: types.DELETE_TASK_REQUEST,
  id
});

export const deleteTaskSuccess = payload => ({
  type: types.DELETE_TASK_SUCCESS,
  payload
});

export const deleteTaskFailure = payload => ({
  type: types.DELETE_TASK_FAILURE,
  payload
});

// Disable task
export const disableTaskRequest = id => ({
  type: types.DISABLE_TASK_REQUEST,
  id
});

export const disableTaskSuccess = payload => ({
  type: types.DISABLE_TASK_SUCCESS,
  payload
});

export const disableTaskFailure = payload => ({
  type: types.DISABLE_TASK_FAILURE,
  payload
});

// Fetch all tasks
export const fetchTasksRequest = () => ({
  type: types.FETCH_TASKS_REQUEST
});

export const fetchTasksSuccess = payload => ({
  type: types.FETCH_TASKS_SUCCESS,
  payload
});

export const fetchTasksFailure = payload => ({
  type: types.FETCH_TASKS_FAILURE,
  payload
});
