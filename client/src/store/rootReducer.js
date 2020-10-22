import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import doctypes from "./doctypes/reducer";
import documents from "./documents/reducer";
import forms from "./forms/reducer";
import tables from "./tables/reducer";
import table_links from "./table_links/reducer";
import user from "./user/reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "documents"],
};

const rootReducer = combineReducers({
  doctypes,
  documents,
  forms,
  tables,
  table_links,
  user,
});

/* export default rootReducer; */

export default persistReducer(persistConfig, rootReducer);
