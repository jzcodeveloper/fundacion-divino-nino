import { all, call, fork, takeEvery, put, select } from "redux-saga/effects";
import axios from "../axios";

import { types } from "./types";
import * as actions from "./actions";
import { selectLinkDocument } from "./selectors";

/* SUBROUTINES */

function* fetchTableLinkDocuments({ params }) {
  try {
    // Return cached data
    /* const documentData = yield select(selectLinkDocument({ params }));
    if (documentData.length > 0) {
      yield put(actions.fetchTableLinkDocumentsSuccess());
      return;
    } */

    const endpoint = `/documents`;
    const options = { params: { ...params, limit: 1000 } };
    const { data } = yield call([axios, axios.get], endpoint, options);

    const payload = { params, data: data.data };
    yield put(actions.fetchTableLinkDocumentsSuccess());
    yield put(actions.createTableLinkDocumentData(payload));
  } catch (error) {
    yield put(actions.fetchTableLinkDocumentsFailure(error));
  }
}

/* WATCHERS */

function* watchFetchTableLinkDocumentsRequest() {
  yield takeEvery(
    types.FETCH_TABLE_LINK_DOCUMENTS_REQUEST,
    fetchTableLinkDocuments
  );
}

export default function* formsSaga() {
  yield all([fork(watchFetchTableLinkDocumentsRequest)]);
}
