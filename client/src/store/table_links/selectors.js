import { createSelector } from "reselect";

const tableLinksState = (state) => state.table_links;

const obj = {};
const arr = [];

export const selectTableLinkError = createSelector(
  [tableLinksState],
  (links) => links.error
);

export const selectTableLinkLoading = createSelector(
  [tableLinksState],
  (links) => links.loading
);

export const selectTableLinksDocuments = createSelector(
  [tableLinksState],
  (links) => links.documents
);

export const selectTableLinkDocument = (params) =>
  createSelector([selectTableLinksDocuments], (documents) => {
    const key = Object.values(params).join("|");
    return documents[key] || arr;
  });

export const selectFilteredTableLinkDocument = (params) =>
  createSelector([selectTableLinkDocument(params)], (documents) => {
    const result = documents.map((doc) => doc[params.populate]);

    return result;
  });
