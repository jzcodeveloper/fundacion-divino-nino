import { types } from "./types";

export const fetchDocumentsRequest = (params) => ({
  type: types.FETCH_DOCUMENTS_REQUEST,
  params,
});

export const fetchDocumentsSuccess = (payload) => ({
  type: types.FETCH_DOCUMENTS_SUCCESS,
  payload,
});

export const fetchDocumentsFailure = (payload) => ({
  type: types.FETCH_DOCUMENTS_FAILURE,
  payload,
});

export const createDocumentsRequest = (params, payload) => ({
  type: types.CREATE_DOCUMENTS_REQUEST,
  params,
  payload,
});

export const createDocumentsSuccess = (payload) => ({
  type: types.CREATE_DOCUMENTS_SUCCESS,
  payload,
});

export const createDocumentsFailure = (payload) => ({
  type: types.CREATE_DOCUMENTS_FAILURE,
  payload,
});

export const updateDocumentsRequest = (params, payload) => ({
  type: types.UPDATE_DOCUMENTS_REQUEST,
  params,
  payload,
});

export const updateDocumentsSuccess = (payload) => ({
  type: types.UPDATE_DOCUMENTS_SUCCESS,
  payload,
});

export const updateDocumentsFailure = (payload) => ({
  type: types.UPDATE_DOCUMENTS_FAILURE,
  payload,
});

export const deleteDocumentsRequest = (params, payload) => ({
  type: types.DELETE_DOCUMENTS_REQUEST,
  params,
  payload,
});

export const deleteDocumentsSuccess = (payload) => ({
  type: types.DELETE_DOCUMENTS_SUCCESS,
  payload,
});

export const deleteDocumentsFailure = (payload) => ({
  type: types.DELETE_DOCUMENTS_FAILURE,
  payload,
});

export const setListLimit = (payload) => ({
  type: types.SET_LIST_LIMIT,
  payload,
});

export const setListSort = (payload) => ({
  type: types.SET_LIST_SORT,
  payload,
});

export const resetDocuments = (payload) => ({
  type: types.RESET_DOCUMENTS,
  payload,
});
