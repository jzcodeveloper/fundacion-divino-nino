import { types } from "./types";

export const fetchFormDocumentRequest = (params) => ({
  type: types.FETCH_FORM_DOCUMENT_REQUEST,
  params,
});

export const fetchFormDocumentSuccess = () => ({
  type: types.FETCH_FORM_DOCUMENT_SUCCESS,
});

export const fetchFormDocumentFailure = (payload) => ({
  type: types.FETCH_FORM_DOCUMENT_FAILURE,
  payload,
});

export const createFormDocumentData = (payload) => ({
  type: types.CREATE_FORM_DOCUMENT_DATA,
  payload,
});

export const updateFormDocumentData = (payload) => ({
  type: types.UPDATE_FORM_DOCUMENT_DATA,
  payload,
});

export const deleteFormDocumentData = (payload) => ({
  type: types.DELETE_FORM_DOCUMENT_DATA,
  payload,
});
