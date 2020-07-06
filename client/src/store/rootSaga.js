import { all, fork } from "redux-saga/effects";

import doctypesSaga from "./doctypes/sagas";
import documentsSaga from "./documents/sagas";
import formsSaga from "./forms/sagas";
import tablesSaga from "./tables/sagas";
import linksSaga from "./links/sagas";
import tableLinksSaga from "./table_links/sagas";
import userSaga from "./user/sagas";

export default function* rootSaga() {
  yield all([
    fork(doctypesSaga),
    fork(documentsSaga),
    fork(formsSaga),
    fork(tablesSaga),
    fork(linksSaga),
    fork(tableLinksSaga),
    fork(userSaga),
  ]);
}
