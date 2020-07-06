import { types } from "./types";

export const fetchDoctypesRequest = () => ({
  type: types.FETCH_DOCTYPES_REQUEST,
});

export const fetchDoctypesSuccess = (payload) => ({
  type: types.FETCH_DOCTYPES_SUCCESS,
  payload,
});

export const fetchDoctypesFailure = (payload) => ({
  type: types.FETCH_DOCTYPES_FAILURE,
  payload,
});
