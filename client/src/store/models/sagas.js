import { all, call, fork, takeLatest, put, select } from "redux-saga/effects";
import axios from "../axios";

import { types } from "./types";
import * as actions from "./actions";

/* SUBROUTINES */

function* fetchModels() {
  try {
    const { data } = yield call([axios, axios.get], `/models`);
    yield put(actions.fetchModelsSuccess(data.data));
  } catch (error) {
    yield put(actions.fetchModelsFailure(error));
  }
}

function* createModel({ payload }) {
  try {
    const { data } = yield call([axios, axios.post], `/models`, payload);
    yield put(actions.createModelSuccess(data.data));
  } catch (error) {
    yield put(actions.createModelFailure(error));
  }
}

function* updateModel({ id, payload }) {
  try {
    const { data } = yield call([axios, axios.put], `/models/${id}`, payload);
    yield put(actions.updateModelSuccess(data.data));
  } catch (error) {
    yield put(actions.updateModelFailure(error));
  }
}

function* deleteModel({ id }) {
  try {
    const { data } = yield call([axios, axios.delete], `/models/${id}`);
    yield put(actions.deleteModelSuccess(data.data));
  } catch (error) {
    yield put(actions.deleteModelFailure(error));
  }
}

function* trainModel({ id, payload }) {
  try {
    const { data } = yield call(
      [axios, axios.put],
      `/models/${id}/train`,
      payload
    );
    yield put(actions.trainModelSuccess(data.data));
  } catch (error) {
    yield put(actions.trainModelFailure(error));
  }
}

function* testModel({ id, payload }) {
  try {
    const { data } = yield call(
      [axios, axios.put],
      `/models/${id}/test`,
      payload
    );
    yield put(actions.testModelSuccess(data.data));
  } catch (error) {
    yield put(actions.testModelFailure(error));
  }
}

/* WATCHERS */

function* watchFetchModelsRequest() {
  yield takeLatest(types.FETCH_MODELS_REQUEST, fetchModels);
}

function* watchCreateModelRequest() {
  yield takeLatest(types.CREATE_MODEL_REQUEST, createModel);
}

function* watchUpdateModelRequest() {
  yield takeLatest(types.UPDATE_MODEL_REQUEST, updateModel);
}

function* watchDeleteModelRequest() {
  yield takeLatest(types.DELETE_MODEL_REQUEST, deleteModel);
}

function* watchTrainModelRequest() {
  yield takeLatest(types.TRAIN_MODEL_REQUEST, trainModel);
}

function* watchTestModelRequest() {
  yield takeLatest(types.TEST_MODEL_REQUEST, testModel);
}

export default function* datasetSaga() {
  yield all([
    fork(watchFetchModelsRequest),
    fork(watchCreateModelRequest),
    fork(watchUpdateModelRequest),
    fork(watchDeleteModelRequest),
    fork(watchTrainModelRequest),
    fork(watchTestModelRequest),
  ]);
}
