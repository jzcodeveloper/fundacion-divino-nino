import { types } from "./types";

// Login administrator
export const loginAdminRequest = payload => ({
  type: types.LOGIN_ADMIN_REQUEST,
  payload
});

export const loginAdminSuccess = token => ({
  type: types.LOGIN_ADMIN_SUCCESS,
  payload: token
});

export const loginAdminFailure = error => ({
  type: types.LOGIN_ADMIN_FAILURE,
  payload: error
});

// Get current administrator
export const getAdminRequest = () => ({
  type: types.GET_ADMIN_REQUEST
});

export const getAdminSuccess = admin => ({
  type: types.GET_ADMIN_SUCCESS,
  payload: admin
});

export const getAdminFailure = error => ({
  type: types.GET_ADMIN_FAILURE,
  payload: error
});

// Update current admin
export const updateAdminRequest = payload => ({
  type: types.UPDATE_ADMIN_REQUEST,
  payload
});

export const updateAdminSuccess = admin => ({
  type: types.UPDATE_ADMIN_SUCCESS,
  payload: admin
});

export const updateAdminFailure = error => ({
  type: types.UPDATE_ADMIN_FAILURE,
  payload: error
});

// Update admin password
export const updatePasswordRequest = payload => ({
  type: types.UPDATE_PASSWORD_REQUEST,
  payload
});

export const updatePasswordSuccess = () => ({
  type: types.UPDATE_PASSWORD_SUCCESS
});

export const updatePasswordFailure = error => ({
  type: types.UPDATE_PASSWORD_FAILURE,
  payload: error
});

// Get admin logs
export const fetchLogsRequest = (page, sort) => ({
  type: types.FETCH_LOGS_REQUEST,
  page,
  sort
});

export const fetchLogsSuccess = logs => ({
  type: types.FETCH_LOGS_SUCCESS,
  payload: logs
});

export const fetchLogsFailure = error => ({
  type: types.FETCH_LOGS_FAILURE,
  payload: error
});

// Logout admin
export const logoutAdminRequest = () => ({
  type: types.LOGOUT_ADMIN_REQUEST
});
