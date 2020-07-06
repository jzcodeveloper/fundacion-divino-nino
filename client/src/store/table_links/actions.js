import { types } from "./types";

export const fetchTableLinkDocumentsRequest = (params) => ({
  type: types.FETCH_TABLE_LINK_DOCUMENTS_REQUEST,
  params,
});

export const fetchTableLinkDocumentsSuccess = () => ({
  type: types.FETCH_TABLE_LINK_DOCUMENTS_SUCCESS,
});

export const fetchTableLinkDocumentsFailure = (payload) => ({
  type: types.FETCH_TABLE_LINK_DOCUMENTS_FAILURE,
  payload,
});

export const createTableLinkDocumentData = (payload) => ({
  type: types.CREATE_TABLE_LINK_DOCUMENT_DATA,
  payload,
});

export const updateTableLinkDocumentData = (payload) => ({
  type: types.UPDATE_TABLE_LINK_DOCUMENT_DATA,
  payload,
});

export const deleteTableLinkDocumentData = (payload) => ({
  type: types.DELETE_TABLE_LINK_DOCUMENT_DATA,
  payload,
});
