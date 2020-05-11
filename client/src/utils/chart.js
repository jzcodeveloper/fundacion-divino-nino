import { shuffleArray } from "./utils";

export const backgroundColors = [
  "rgba(54, 162, 235, 0.75)",
  "rgba(75, 192, 192, 0.75)",
  "rgba(255, 99, 132, 0.75)",
  "rgba(255, 206, 86, 0.75)",
  "rgba(153, 102, 255, 0.75)",
  "rgba(255, 159, 64, 0.75)",
  "rgba(149, 125, 173, 0.75)",
  "rgba(253, 247, 194, 0.75)",
  "rgba(194, 59, 35, 0.75)",
  "rgba(131, 104, 83, 0.75)"
];

export const createChartData = (labels, data, label, props, datasetProps) => ({
  ...props,
  labels,
  datasets: [
    {
      ...datasetProps,
      label,
      data,
      backgroundColor: data.map((_, i) => backgroundColors[i % 10])
    }
  ]
});
