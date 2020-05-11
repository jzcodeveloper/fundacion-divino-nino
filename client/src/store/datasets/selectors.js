import { createSelector } from "reselect";

const datasetsState = state => state.datasets;

export const selectDatasets = createSelector(
  [datasetsState],
  datasets => datasets.datasets
);

export const selectError = createSelector(
  [datasetsState],
  datasets => datasets.error
);

export const selectLoading = createSelector(
  [datasetsState],
  datasets => datasets.loading
);

export const selectDataset = _id =>
  createSelector([selectDatasets], datasets =>
    datasets.find(dataset => dataset._id === _id)
  );
