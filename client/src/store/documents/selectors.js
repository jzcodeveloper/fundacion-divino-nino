import { createSelector } from "reselect";

const arr = [];

const documentsState = (state) => state.documents;

export const selectError = createSelector(
  [documentsState],
  (documents) => documents.error
);

export const selectLoading = createSelector(
  [documentsState],
  (documents) => documents.loading
);

export const selectAllDocuments = createSelector(
  [documentsState],
  (documents) => documents.documents
);

export const selectLimit = (doctype) =>
  createSelector([selectAllDocuments], (documents) =>
    documents[doctype] ? documents[doctype].limit : 20
  );

export const selectSort = (doctype) =>
  createSelector([selectAllDocuments], (documents) =>
    documents[doctype] ? documents[doctype].sort : "updated_at desc"
  );

export const selectDocuments = (doctype) =>
  createSelector([selectAllDocuments], (documents) =>
    documents[doctype] ? documents[doctype].results : arr
  );

export const selectDocument = (doctype, name) =>
  createSelector([selectDocuments(doctype)], (documents) =>
    documents.find((doc) => doc.name === name)
  );
