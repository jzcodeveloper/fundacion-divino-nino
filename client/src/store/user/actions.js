import { types } from "./types";

export const loginUserRequest = (payload) => ({
  type: types.LOGIN_USER_REQUEST,
  payload,
});

export const loginUserSuccess = (payload) => ({
  type: types.LOGIN_USER_SUCCESS,
  payload,
});

export const loginUserFailure = (payload) => ({
  type: types.LOGIN_USER_FAILURE,
  payload,
});

export const getUserRequest = () => ({
  type: types.GET_USER_REQUEST,
});

export const getUserSuccess = (payload) => ({
  type: types.GET_USER_SUCCESS,
  payload,
});

export const getUserFailure = (payload) => ({
  type: types.GET_USER_FAILURE,
  payload,
});

// Logout admin
export const logoutUserRequest = () => ({
  type: types.LOGOUT_USER_REQUEST,
});
