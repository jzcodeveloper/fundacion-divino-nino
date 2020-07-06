import { all, call, fork, takeEvery, put, select } from "redux-saga/effects";
import axios from "../axios";

import { types } from "./types";
import * as actions from "./actions";
import { selectFormDocument } from "./selectors";

/* SUBROUTINES */

function* fetchFormDocument({ params }) {
  try {
    // Return cached data
    /* const documentData = yield select(selectFormDocument(params.name));
    if (Object.keys(documentData).length > 0) {
      const payload = { name: params.name, data: documentData };
      yield put(actions.fetchFormDocumentSuccess());
      return;
    } */

    const endpoint = `/documents`;
    const options = { params };
    const { data } = yield call([axios, axios.get], endpoint, options);

    const payload = { name: params.name, data: data.data };
    yield put(actions.fetchFormDocumentSuccess());
    yield put(actions.createFormDocumentData(payload));
  } catch (error) {
    yield put(actions.fetchFormDocumentFailure(error));
  }
}

/* WATCHERS */

function* watchFetchFormDocumentRequest() {
  yield takeEvery(types.FETCH_FORM_DOCUMENT_REQUEST, fetchFormDocument);
}

export default function* formsSaga() {
  yield all([fork(watchFetchFormDocumentRequest)]);
}
