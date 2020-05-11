import { types } from "./types";

// Get all contributors
export const fetchContributorsRequest = (page, sort) => ({
  type: types.FETCH_CONTRIBUTORS_REQUEST,
  page,
  sort
});

export const fetchContributorsSuccess = contributors => ({
  type: types.FETCH_CONTRIBUTORS_SUCCESS,
  payload: contributors
});

export const fetchContributorsFailure = error => ({
  type: types.FETCH_CONTRIBUTORS_FAILURE,
  payload: error
});

// Get contributors count
export const fetchCountRequest = () => ({
  type: types.FETCH_COUNT_REQUEST
});

export const fetchCountSuccess = count => ({
  type: types.FETCH_COUNT_SUCCESS,
  payload: count
});

export const fetchCountFailure = error => ({
  type: types.FETCH_COUNT_FAILURE,
  payload: error
});
