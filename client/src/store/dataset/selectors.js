import { createSelector } from "reselect";
import { createChartData } from "../../utils/chart";

const datasetsState = (state) => state.dataset;

export const selectDataset = createSelector(
  [datasetsState],
  (dataset) => dataset.dataset
);

export const selectError = createSelector(
  [datasetsState],
  (dataset) => dataset.error
);

export const selectLoading = createSelector(
  [datasetsState],
  (dataset) => dataset.loading
);

export const selectGlobalDataForChart = createSelector(
  [selectDataset],
  (dataset) => {
    if (!dataset || dataset.dataset.length === 0) return [];

    const chartData = [];

    const data = [];
    const freq = [];

    // Extract labels from input questions
    dataset.task.questions.forEach(({ question, answers }, index) => {
      chartData[index] = { question, labels: answers };
    });

    // For each question get the answer and accumulate the values
    dataset.dataset.forEach((set) => {
      // Questions
      const keys = Object.keys(set.data);
      const values = Object.values(set.data);

      if (dataset.task.testOnly) keys.pop();

      keys.forEach((key, index) => {
        if (!data[index]) data[index] = [];
        data[index].push(values[index]);
      });
    });

    // Get frequency object
    data.forEach((elements, index) => {
      const question = dataset.task.questions[index];

      freq[index] = question.answers.reduce((acc, val, index) => {
        acc[val] = 0;
        return acc;
      }, []);

      const keys = Object.keys(freq[index]);

      elements.forEach((element) => {
        keys.forEach((key) => (key === element ? freq[index][key]++ : 0));
      });

      const values = Object.values(freq[index]);

      chartData[index].dataset = values;
    });

    return chartData.map(({ question, labels, dataset }) =>
      createChartData(labels, dataset, "Respuestas Totales", { question })
    );
  }
);
