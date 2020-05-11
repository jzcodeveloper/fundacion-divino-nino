import { createSelector } from "reselect";

const taskState = state => state.task;

export const selectTask = createSelector([taskState], task => task.task);

export const selectError = createSelector([taskState], task => task.error);

export const selectLoading = createSelector([taskState], task => task.loading);
