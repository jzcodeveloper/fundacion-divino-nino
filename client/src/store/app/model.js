export const initialState = Object.freeze({
  global: {
    contributors: 0,
    contributorsActivity: [],
    totalContributors: 0,
    tasks: 0,
    tasksActivity: [],
    totalTasks: 0,
    models: 0,
    modelsActivity: [],
    totalModels: 0,
  },
  sidebar: { collapsed: true, items: {} },
  error: null,
  loading: true,
});
