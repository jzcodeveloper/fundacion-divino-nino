import { all, call, fork, takeEvery, put, select } from "redux-saga/effects";
import axios from "../axios";

import { types } from "./types";
import * as actions from "./actions";
import { selectTableDocument } from "./selectors";

/* SUBROUTINES */

function* fetchTableDocuments({ params }) {
  try {
    // Extract params
    const { model, parent_model, parent_name } = params;

    // Return cached data
    /* const documentData = yield select(
      selectTableDocument({ model, parent_model, parent_name })
    );

    if (documentData.length > 0) {
      const payload = { model, parent_model, parent_name, data: documentData };
      yield put(actions.fetchTableDocumentsSuccess());
      return;
    } */

    const endpoint = `/documents`;
    const options = { params: { ...params, limit: 1000 } };
    const { data } = yield call([axios, axios.get], endpoint, options);

    const payload = { model, parent_model, parent_name, data: data.data };
    yield put(actions.fetchTableDocumentsSuccess());
    yield put(actions.createTableDocumentData(payload));
  } catch (error) {
    yield put(actions.fetchTableDocumentsFailure(error));
  }
}

/* WATCHERS */

function* watchFetchTableDocumentsRequest() {
  yield takeEvery(types.FETCH_TABLE_DOCUMENTS_REQUEST, fetchTableDocuments);
}

export default function* formsSaga() {
  yield all([fork(watchFetchTableDocumentsRequest)]);
}
