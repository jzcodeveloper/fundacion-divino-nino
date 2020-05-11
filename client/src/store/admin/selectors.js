import { createSelector } from "reselect";
import { getMinutes, formatDate } from "../../utils/utils";
import { createChartData } from "../../utils/chart";

export const adminState = state => state.admin;

export const selectAdmin = createSelector([adminState], admin => admin.admin);

export const selectToken = createSelector([adminState], admin => admin.token);

export const selectError = createSelector([adminState], admin => admin.error);

export const selectLoading = createSelector(
  [adminState],
  admin => admin.loading
);

export const selectAuthenticated = createSelector(
  [adminState],
  admin => admin.authenticated
);

export const selectLogs = createSelector([adminState], admin => admin.logs);

export const selectLogsLoading = createSelector(
  [selectLogs],
  logs => logs.loading
);

export const selectLogsTotal = createSelector([selectLogs], logs => logs.total);

export const selectLogsError = createSelector([selectLogs], logs => logs.error);

export const selectLogsResults = createSelector(
  [selectLogs],
  logs => logs.results
);

export const selectResultsByPage = page =>
  createSelector([selectLogsResults], results => results[page] || []);

export const selectLoginActivity = createSelector(
  [selectAdmin],
  admin => admin.loginActivity
);

export const selectTasksActivity = createSelector(
  [selectAdmin],
  admin => admin.tasksActivity
);

export const selectModelsActivity = createSelector(
  [selectAdmin],
  admin => admin.modelsActivity
);

export const selectLoginActivityForChart = createSelector(
  [selectLoginActivity],
  activity => {
    const labels = activity.map(({ date }) => formatDate(date, "/"));
    const data = activity.map(({ total }) => total);

    return createChartData(labels, data, "Ingresos al Sistema");
  }
);

export const selectTasksActivityForChart = createSelector(
  [selectTasksActivity],
  activity => {
    const labels = activity.map(({ date }) => formatDate(date, "/"));
    const data = activity.map(({ total }) => total);

    return createChartData(labels, data, "Tareas Creadas");
  }
);

export const selectModelsActivityForChart = createSelector(
  [selectModelsActivity],
  activity => {
    const labels = activity.map(({ date }) => formatDate(date, "/"));
    const data = activity.map(({ total }) => total);

    return createChartData(labels, data, "Modelos Creadas");
  }
);
