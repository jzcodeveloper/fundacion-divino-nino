import { createSelector } from "reselect";
import { getMinutes, formatDate } from "../../utils/utils";
import { createChartData } from "../../utils/chart";

export const contributorState = (state) => state.contributor;

export const selectContributor = createSelector(
  [contributorState],
  (contributor) => contributor.contributor
);

export const selectToken = createSelector(
  [contributorState],
  (contributor) => contributor.token
);

export const selectError = createSelector(
  [contributorState],
  (contributor) => contributor.error
);

export const selectLoading = createSelector(
  [contributorState],
  (contributor) => contributor.loading
);

export const selectAuthenticated = createSelector(
  [contributorState],
  (contributor) => contributor.authenticated
);

export const selectHistory = createSelector(
  [selectContributor],
  (contributor) => contributor.history
);

export const selectPaginatedHistory = createSelector(
  [contributorState],
  (contributor) => contributor.history
);

export const selectHistoryLoading = createSelector(
  [selectPaginatedHistory],
  (history) => history.loading
);

export const selectHistoryTotal = createSelector(
  [selectPaginatedHistory],
  (history) => history.total
);

export const selectHistoryError = createSelector(
  [selectPaginatedHistory],
  (history) => history.error
);

export const selectHistoryResults = createSelector(
  [selectPaginatedHistory],
  (history) => history.results
);

export const selectResultsByPage = (page) =>
  createSelector([selectHistoryResults], (results) => results[page] || []);

export const selectHistoryByPage = (page) =>
  createSelector([selectHistoryResults], (results) => {
    if (!results[page]) return [];

    return results[page].map((history) => ({
      id: history.task.id,
      title: history.task.title,
      totalTasks: history.totalTasks,
      totalQuestions: history.totalQuestions,
      totalTime: getMinutes(history.totalTime),
      date: formatDate(history.date, "/"),
    }));
  });

export const selectActivity = createSelector(
  [selectContributor],
  (contributor) => (contributor ? contributor.tasksActivity : [])
);

export const selectSummaryData = createSelector(
  [selectContributor],
  (contributor) => ({
    totalTasks: contributor ? contributor.totalTasks : 0,
    totalQuestions: contributor ? contributor.totalQuestions : 0,
    totalTime: contributor ? contributor.totalTime : 0,
  })
);

export const selectActivityForChart = createSelector(
  [selectActivity],
  (activity) => {
    const labels = activity.map(({ date }) => formatDate(date, "/"));
    const data = activity.map(({ total }) => total);

    return createChartData(labels, data, "Tareas Completadas");
  }
);

export const canContinueWorking = (task) =>
  createSelector([selectHistory], (history) => {
    if (!task) return false;
    if (history.length === 0) return true;

    const index = history.findIndex((record) => {
      return record.task._id.toString() === task._id.toString();
    });

    if (index === -1) return true;

    const { totalTasks } = history[index];
    const { maxTasks } = task;

    return maxTasks >= totalTasks;
  });
