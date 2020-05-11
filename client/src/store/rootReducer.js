import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import admin from "./admin/reducer";
import app from "./app/reducer";
import task from "./task/reducer";
import tasks from "./tasks/reducer";
import modals from "./modals/reducer";
import models from "./models/reducer";
import dataset from "./dataset/reducer";
import datasets from "./datasets/reducer";
import contributor from "./contributor/reducer";
import contributors from "./contributors/reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "app",
    "admin",
    "contributor",
    "tasks",
    "task",
    "datasets",
    "dataset",
    "models",
  ],
};

const rootReducer = combineReducers({
  admin,
  app,
  task,
  tasks,
  modals,
  models,
  dataset,
  datasets,
  contributor,
  contributors,
});

/* export default rootReducer; */

export default persistReducer(persistConfig, rootReducer);
