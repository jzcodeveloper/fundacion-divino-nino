import { types } from "./types";

// Login contributor
export const loginContributorRequest = payload => ({
  type: types.LOGIN_CONTRIBUTOR_REQUEST,
  payload
});

export const loginContributorSuccess = token => ({
  type: types.LOGIN_CONTRIBUTOR_SUCCESS,
  payload: token
});

export const loginContributorFailure = error => ({
  type: types.LOGIN_CONTRIBUTOR_FAILURE,
  payload: error
});

// Get current contributor
export const getContributorRequest = () => ({
  type: types.GET_CONTRIBUTOR_REQUEST
});

export const getContributorSuccess = contributor => ({
  type: types.GET_CONTRIBUTOR_SUCCESS,
  payload: contributor
});

export const getContributorFailure = error => ({
  type: types.GET_CONTRIBUTOR_FAILURE,
  payload: error
});

// Get contributor history
export const fetchHistoryRequest = (page, sort) => ({
  type: types.FETCH_HISTORY_REQUEST,
  page,
  sort
});

export const fetchHistorySuccess = history => ({
  type: types.FETCH_HISTORY_SUCCESS,
  payload: history
});

export const fetchHistoryFailure = error => ({
  type: types.FETCH_HISTORY_FAILURE,
  payload: error
});

// Logout contributor
export const logoutContributorRequest = () => ({
  type: types.LOGOUT_CONTRIBUTOR_REQUEST
});
