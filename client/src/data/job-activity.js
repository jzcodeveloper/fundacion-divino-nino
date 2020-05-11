import { formatDate } from "../utils/utils";

const dates = [
  "2020-01-17",
  "2020-01-18",
  "2020-01-19",
  "2020-01-20",
  "2020-01-21",
  "2020-01-22"
];

export default {
  labels: dates.map(date => formatDate(date)),
  datasets: [
    {
      label: "Tareas",
      data: [
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20)
      ],
      backgroundColor: [
        "rgba(75, 192, 192, 0.75)",
        "rgba(255, 99, 132, 0.75)",
        "rgba(54, 162, 235, 0.75)",
        "rgba(255, 206, 86, 0.75)",
        "rgba(153, 102, 255, 0.75)",
        "rgba(255, 159, 64, 0.75)"
      ]
    }
  ]
};
