import { all, call, fork, takeLatest, put, select } from "redux-saga/effects";
import { history } from "../../history";
import axios from "../axios";

import { types } from "./types";
import * as actions from "./actions";

/* SUBROUTINES */

function* fetchDocuments({ params }) {
  try {
    const endpoint = `/documents`;
    const opts = { params };
    const { data } = yield call([axios, axios.get], endpoint, opts);
    const payload = { model: params.model, data: data.data };
    yield put(actions.fetchDocumentsSuccess(payload));
  } catch (error) {
    yield put(actions.fetchDocumentsFailure(error));
  }
}

function* createDocuments({ params, payload }) {
  try {
    const endpoint = `/documents`;
    const opts = { params };
    const { data } = yield call([axios, axios.post], endpoint, payload, opts);
    yield put(actions.createDocumentsSuccess(data.data));
    history.push(`/desk/List/${params.model}`);
  } catch (error) {
    yield put(actions.createDocumentsFailure(error));
  }
}

function* updateDocuments({ params, payload }) {
  try {
    const endpoint = `/documents`;
    const opts = { params };
    const { data } = yield call([axios, axios.put], endpoint, payload, opts);
    yield put(actions.updateDocumentsSuccess(data.data));
  } catch (error) {
    yield put(actions.updateDocumentsFailure(error));
  }
}

function* deleteDocuments({ params, payload }) {
  try {
    const endpoint = `/documents/deleteMany`;
    const opts = { params };

    const { data } = yield call([axios, axios.post], endpoint, payload, opts);
    yield put(actions.deleteDocumentsSuccess(data.data));
  } catch (error) {
    yield put(actions.deleteDocumentsFailure(error));
  }
}

/* WATCHERS */

function* watchFetchDocumentsRequest() {
  yield takeLatest(types.FETCH_DOCUMENTS_REQUEST, fetchDocuments);
}

function* watchCreateDocumentsRequest() {
  yield takeLatest(types.CREATE_DOCUMENTS_REQUEST, createDocuments);
}

function* watchUpdateDocumentsRequest() {
  yield takeLatest(types.UPDATE_DOCUMENTS_REQUEST, updateDocuments);
}

function* watchDeleteDocumentsRequest() {
  yield takeLatest(types.DELETE_DOCUMENTS_REQUEST, deleteDocuments);
}

export default function* documentSaga() {
  yield all([
    fork(watchFetchDocumentsRequest),
    fork(watchCreateDocumentsRequest),
    fork(watchUpdateDocumentsRequest),
    fork(watchDeleteDocumentsRequest),
  ]);
}
