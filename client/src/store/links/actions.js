import { types } from "./types";

export const fetchLinkDocumentsRequest = (params) => ({
  type: types.FETCH_LINK_DOCUMENTS_REQUEST,
  params,
});

export const fetchLinkDocumentsSuccess = () => ({
  type: types.FETCH_LINK_DOCUMENTS_SUCCESS,
});

export const fetchLinkDocumentsFailure = (payload) => ({
  type: types.FETCH_LINK_DOCUMENTS_FAILURE,
  payload,
});

export const createLinkDocumentData = (payload) => ({
  type: types.CREATE_LINK_DOCUMENT_DATA,
  payload,
});

export const updateLinkDocumentData = (payload) => ({
  type: types.UPDATE_LINK_DOCUMENT_DATA,
  payload,
});

export const deleteLinkDocumentData = (payload) => ({
  type: types.DELETE_LINK_DOCUMENT_DATA,
  payload,
});
