import { createSelector } from "reselect";

const tablesState = (state) => state.tables;

const obj = {};
const arr = [];

export const selectTableError = createSelector(
  [tablesState],
  (tables) => tables.error
);

export const selectTableLoading = createSelector(
  [tablesState],
  (tables) => tables.loading
);

export const selectTableDocuments = createSelector(
  [tablesState],
  (tables) => tables.documents
);

export const selectTableDocument = ({ model, parent_model, parent_name }) =>
  createSelector([selectTableDocuments], (documents) => {
    const key = [model, parent_model, parent_name].join(" - ");
    return documents[key] || arr;
  });
