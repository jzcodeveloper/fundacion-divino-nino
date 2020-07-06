import { createSelector } from "reselect";

const formsState = (state) => state.forms;

const obj = {};
const arr = [];

export const selectFormError = createSelector(
  [formsState],
  (forms) => forms.error
);

export const selectFormLoading = createSelector(
  [formsState],
  (forms) => forms.loading
);

export const selectFormDocuments = createSelector(
  [formsState],
  (forms) => forms.documents
);

export const selectFormDocument = (name) =>
  createSelector([selectFormDocuments], (documents) => documents[name] || obj);
