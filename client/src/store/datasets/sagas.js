import { all, call, fork, takeLatest, put, select } from "redux-saga/effects";
import axios from "../axios";

import { types } from "./types";
import * as actions from "./actions";

/* SUBROUTINES */

function* fetchDatasets() {
  try {
    const { data } = yield call([axios, axios.get], `/datasets`);
    yield put(actions.fetchDatasetsSuccess(data.data));
  } catch (error) {
    yield put(actions.fetchDatasetsFailure(error));
  }
}

function* createData({ id, payload }) {
  try {
    const { data } = yield call(
      [axios, axios.put],
      `/datasets/${id}/add`,
      payload
    );
    yield put(actions.createDataSuccess(data.data));
  } catch (error) {
    yield put(actions.createDataFailure(error));
  }
}

function* updateSplitRatio({ id, payload }) {
  try {
    const { data } = yield call(
      [axios, axios.put],
      `/datasets/${id}/ratio`,
      payload
    );
    yield put(actions.updateSplitRatioSuccess(data.data));
  } catch (error) {
    yield put(actions.updateSplitRatioFailure(error));
  }
}

function* emptyDataset({ id }) {
  try {
    const { data } = yield call([axios, axios.get], `/datasets/${id}/empty`);
    yield put(actions.emptyDatasetSuccess(data.data));
  } catch (error) {
    yield put(actions.emptyDatasetFailure(error));
  }
}

function* exportDataset({ id }) {
  try {
    const { data } = yield call([axios, axios.get], `/datasets/${id}/export`);
    yield put(actions.exportDatasetSuccess(data));
  } catch (error) {
    yield put(actions.exportDatasetFailure(error));
  }
}

/* WATCHERS */

function* watchFetchDatasetsRequest() {
  yield takeLatest(types.FETCH_DATASETS_REQUEST, fetchDatasets);
}

function* watchCreateDataRequest() {
  yield takeLatest(types.CREATE_DATA_REQUEST, createData);
}

function* watchUpdateSplitRatioRequest() {
  yield takeLatest(types.UPDATE_SPLIT_RATIO_REQUEST, updateSplitRatio);
}

function* watchEmptyDatasetRequest() {
  yield takeLatest(types.EMPTY_DATASET_REQUEST, emptyDataset);
}

function* watchExportDatasetRequest() {
  yield takeLatest(types.EXPORT_DATASET_REQUEST, exportDataset);
}

export default function* datasetsSaga() {
  yield all([
    fork(watchFetchDatasetsRequest),
    fork(watchCreateDataRequest),
    fork(watchUpdateSplitRatioRequest),
    fork(watchEmptyDatasetRequest),
    fork(watchExportDatasetRequest)
  ]);
}
