import { formatDate, getMinutes } from "../utils/utils";

export default [
  {
    id: 1023510,
    email: "javier_zabala@gmail.com",
    username: "@Javier",
    totalTasks: 10,
    totalQuestions: 50,
    totalTime: getMinutes(3000000),
    date: formatDate(1579515639785, "/")
  },
  {
    id: 1025510,
    email: "maribel@gmail.com",
    username: "@Maribel",
    totalTasks: 8,
    totalQuestions: 42,
    totalTime: getMinutes(2400000),
    date: formatDate(1579728639785, "/")
  },
  {
    id: 1053510,
    email: "uniojeda@gmail.com",
    username: "@Uniojeda",
    totalTasks: 2,
    totalQuestions: 15,
    totalTime: getMinutes(600000),
    date: formatDate(1579606397850, "/")
  },
  {
    id: 1023580,
    email: "bella@gmail.com",
    username: "@Bella",
    totalTasks: 1,
    totalQuestions: 7,
    totalTime: getMinutes(300000),
    date: formatDate(1579504397850, "/")
  }
];

/* export default new Array(10).fill(0).map(_ => ({
  id: 1023580,
  email: "bella@gmail.com",
  username: "@Bella",
  totalTasks: 1,
  totalQuestions: 7,
  totalTime: getMinutes(300000),
  date: formatDate(1579504397850, "/")
}));
 */
