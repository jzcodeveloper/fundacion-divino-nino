import { createSelector } from "reselect";
import { getMinutes, formatDate } from "../../utils/utils";
import { createChartData } from "../../utils/chart";

const tasksState = (state) => state.tasks;

export const selectTasks = createSelector([tasksState], (tasks) => tasks.tasks);

export const selectError = createSelector([tasksState], (tasks) => tasks.error);

export const selectLoading = createSelector(
  [tasksState],
  (tasks) => tasks.loading
);

export const selectTask = (_id) =>
  createSelector(
    [selectTasks],
    (tasks) => tasks.find((task) => task._id === _id)
  );

export const selectAvailableTasks = createSelector([selectTasks], (tasks) =>
  tasks.filter((task) => task.enabled === true)
);

export const selectTasksForTable = createSelector(
  [selectAvailableTasks],
  (tasks) =>
    tasks.map((task) => ({
      id: task.id,
      _id: task._id,
      title: task.title,
      timesCompleted: task.timesCompleted,
      totalQuestions: task.totalQuestions,
      averageTime: getMinutes(task.averageTime),
    }))
);

export const selectGlobalActivityForChart = createSelector(
  [selectTasks],
  (tasks) => {
    const global = [];

    tasks.forEach((task) => {
      task.tasksActivity.forEach(({ date, total }, i) => {
        if (!global[i]) global[i] = { date, total: 0 };

        global[i].total += total;
      });
    });

    const labels = global.map(({ date }) => formatDate(date, "/"));
    const data = global.map(({ total }) => total);

    return createChartData(labels, data, "Tareas Completadas");
  }
);
