import { all, fork } from "redux-saga/effects";

import adminSaga from "./admin/sagas";
import appSaga from "./app/sagas";
import taskSaga from "./task/sagas";
import tasksSaga from "./tasks/sagas";
import modelsSaga from "./models/sagas";
import datasetSaga from "./dataset/sagas";
import datasetsSaga from "./datasets/sagas";
import contributorSaga from "./contributor/sagas";
import contributorsSaga from "./contributors/sagas";

export default function* rootSaga() {
  yield all([
    fork(adminSaga),
    fork(appSaga),
    fork(taskSaga),
    fork(tasksSaga),
    fork(modelsSaga),
    fork(datasetSaga),
    fork(datasetsSaga),
    fork(contributorSaga),
    fork(contributorsSaga)
  ]);
}
