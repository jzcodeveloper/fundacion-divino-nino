import { types } from "./types";

// Logout user
export const logoutUserRequest = () => ({
  type: types.LOGOUT_USER_REQUEST
});

export const logoutUserSuccess = () => ({
  type: types.LOGOUT_USER_SUCCESS
});

export const logoutUserFailure = error => ({
  type: types.LOGOUT_USER_FAILURE,
  payload: error
});
