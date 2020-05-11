import { createSelector } from "reselect";
import { getMinutes, formatDate } from "../../utils/utils";
import { createChartData } from "../../utils/chart";

export const appState = (state) => state.app;

export const selectGlobalStats = createSelector(
  [appState],
  (app) => app.global
);

export const selectSidebar = createSelector([appState], (app) => app.sidebar);

export const selectError = createSelector([appState], (app) => app.error);

export const selectLoading = createSelector([appState], (app) => app.loading);

export const selectContributorsActivity = createSelector(
  [selectGlobalStats],
  (global) => global.contributorsActivity
);

export const selectContributorsActivityForChart = createSelector(
  [selectContributorsActivity],
  (activity) => {
    const labels = activity.map(({ date }) => formatDate(date, "/"));
    const data = activity.map(({ total }) => total);

    return createChartData(labels, data, "Usuarios Registrados");
  }
);

export const selectTasksActivity = createSelector(
  [selectGlobalStats],
  (global) => global.tasksActivity
);

export const selectTasksActivityForChart = createSelector(
  [selectTasksActivity],
  (activity) => {
    const labels = activity.map(({ date }) => formatDate(date, "/"));
    const data = activity.map(({ total }) => total);

    return createChartData(labels, data, "Tareas Creadas");
  }
);

export const selectModelsActivity = createSelector(
  [selectGlobalStats],
  (global) => global.modelsActivity
);

export const selectModelsActivityForChart = createSelector(
  [selectModelsActivity],
  (activity) => {
    const labels = activity.map(({ date }) => formatDate(date, "/"));
    const data = activity.map(({ total }) => total);

    return createChartData(labels, data, "Modelos Creados");
  }
);

export const selectSidebarCollapsed = createSelector(
  [selectSidebar],
  (sidebar) => sidebar.collapsed
);

export const selectSidebarItems = createSelector(
  [selectSidebar],
  (sidebar) => sidebar.items
);

export const selectSidebarItemExpanded = (index) =>
  createSelector([selectSidebarItems], (items) => items[index]);
