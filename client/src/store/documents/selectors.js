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

export const selectSortField = (doctype) =>
  createSelector([selectAllDocuments], (documents) =>
    documents[doctype]
      ? documents[doctype].sort_field
      : { field_name: "updated_at", label: "Actualizado El" }
  );

export const selectSortOrder = (doctype) =>
  createSelector([selectAllDocuments], (documents) =>
    documents[doctype] ? documents[doctype].sort_order : "asc"
  );

export const selectDocuments = (doctype) =>
  createSelector([selectAllDocuments], (documents) =>
    documents[doctype] ? documents[doctype].results : arr
  );

export const selectDocument = (doctype, name) =>
  createSelector([selectDocuments(doctype)], (documents) =>
    documents.find((doc) => doc.name === name)
  );
