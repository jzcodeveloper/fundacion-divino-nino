import Home from "../../components/Home";
import Login from "../../components/Login";
import Admin from "../../components/Login/Admin";
import Contributor from "../../components/Login/Contributor";
import Task from "../../components/Task";
import TaskHistory from "../../components/TaskHistory";
import TaskList from "../../components/TaskList";
import TaskOverview from "../../components/TaskOverview";

export const routes = [
  {
    path: "/",
    component: Home,
    role: "",
  },
  {
    path: "/login",
    component: Login,
    role: "",
  },
  {
    path: "/login/admin",
    component: Admin,
    role: "",
  },
  {
    path: "/login/contributor",
    component: Contributor,
    role: "",
  },
  {
    path: "/tasks/list/:id",
    component: Task,
    role: "contributor",
  },
  {
    path: "/tasks/list",
    component: TaskList,
    role: "contributor",
  },
  {
    path: "/tasks/history",
    component: TaskHistory,
    role: "contributor",
  },
  {
    path: "/tasks/overview",
    component: TaskOverview,
    role: "contributor",
  },
];
