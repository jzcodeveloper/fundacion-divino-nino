import Tasks from "../Tasks";
import Datasets from "../Datasets";
import Models from "../Models";
import Account from "../Account";

export const routes = [
  {
    path: "/dashboard/tasks",
    title: "Resumen de las Tareas",
    component: Tasks,
    role: "admin",
    items: [
      { caption: "Resumen", link: "/dashboard/tasks/overview" },
      { caption: "Actividad", link: "/dashboard/tasks/activity" },
      { caption: "Historial", link: "/dashboard/tasks/history" },
    ],
  },
  {
    path: "/dashboard/datasets",
    title: "Resumen de los Datasets",
    component: Datasets,
    role: "admin",
    items: [{ caption: "Resumen", link: "/dashboard/datasets/overview" }],
  },
  {
    path: "/dashboard/models",
    title: "Resumen de los Modelos",
    component: Models,
    role: "admin",
    items: [{ caption: "Resumen", link: "/dashboard/models/overview" }],
  },
  {
    path: "/dashboard/account",
    title: "Resumen de la Cuenta",
    component: Account,
    role: "admin",
    items: [{ caption: "Resumen", link: "/dashboard/account/overview" }],
  },
];

export const sidebar = [
  {
    title: "Tareas",
    icons: ["tasks"],
    captions: ["Resumen de las Tareas"],
    links: ["/dashboard/tasks/overview"],
  },
  {
    title: "Datasets",
    icons: ["database"],
    captions: ["Resumen de los Datasets"],
    links: ["/dashboard/datasets/overview"],
  },
  {
    title: "Modelos",
    icons: ["chalkboard"],
    captions: ["Resumen de los Modelos"],
    links: ["/dashboard/models/overview"],
  },
  {
    title: "Cuenta",
    icons: ["user", "sign-out-alt"],
    captions: ["Resumen de la Cuenta", "Salir del Sistema"],
    links: ["/dashboard/account/overview", "/logout"],
  },
];
