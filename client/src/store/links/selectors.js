import { createSelector } from "reselect";

const linksState = (state) => state.links;

const obj = {};
const arr = [];

export const selectLinkError = createSelector(
  [linksState],
  (links) => links.error
);

export const selectLinkLoading = createSelector(
  [linksState],
  (links) => links.loading
);

export const selectLinksDocuments = createSelector(
  [linksState],
  (links) => links.documents
);

export const selectLinkDocument = ({ model }) =>
  createSelector([selectLinksDocuments], (documents) => {
    return documents[model] || arr;
  });
