import { types } from "./types";

export const fetchTableDocumentsRequest = (params) => ({
  type: types.FETCH_TABLE_DOCUMENTS_REQUEST,
  params,
});

export const fetchTableDocumentsSuccess = () => ({
  type: types.FETCH_TABLE_DOCUMENTS_SUCCESS,
});

export const fetchTableDocumentsFailure = (payload) => ({
  type: types.FETCH_TABLE_DOCUMENTS_FAILURE,
  payload,
});

export const createTableDocumentData = (payload) => ({
  type: types.CREATE_TABLE_DOCUMENT_DATA,
  payload,
});

export const updateTableDocumentData = (payload) => ({
  type: types.UPDATE_TABLE_DOCUMENT_DATA,
  payload,
});

export const deleteTableDocumentData = (payload) => ({
  type: types.DELETE_TABLE_DOCUMENT_DATA,
  payload,
});
