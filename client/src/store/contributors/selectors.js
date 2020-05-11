import { createSelector } from "reselect";
import { getMinutes, formatDate } from "../../utils/utils";

export const contributorsState = state => state.contributors;

export const selectContributors = createSelector(
  [contributorsState],
  contributors => contributors.contributors
);

export const selectError = createSelector(
  [contributorsState],
  contributors => contributors.error
);

export const selectLoading = createSelector(
  [contributorsState],
  contributors => contributors.loading
);

export const selectTotal = createSelector(
  [selectContributors],
  contributors => contributors.total
);

export const selectResults = createSelector(
  [selectContributors],
  contributors => contributors.results
);

export const selectResultsByPage = page =>
  createSelector([selectResults], results => results[page] || []);

export const selectHistoryByPage = page =>
  createSelector([selectResults], results => {
    if (!results[page]) return [];

    return results[page].map(contributor => ({
      id: contributor.id,
      email: contributor.email,
      username: contributor.username,
      totalTasks: contributor.totalTasks,
      totalQuestions: contributor.totalQuestions,
      totalTime: getMinutes(contributor.totalTime),
      date: formatDate(contributor.createdAt, "/")
    }));
  });
