import { all, call, fork, takeLatest, put, select } from "redux-saga/effects";
import axios from "../axios";

import { types } from "./types";
import * as actions from "./actions";

/* SUBROUTINES */

function* createTask({ payload }) {
  try {
    const { data } = yield call([axios, axios.post], `/tasks`, payload);
    yield put(actions.createTaskSuccess(data.data));
  } catch (error) {
    yield put(actions.createTaskFailure(error));
  }
}

function* updateTask({ id, payload }) {
  try {
    const { data } = yield call([axios, axios.put], `/tasks/${id}`, payload);
    yield put(actions.updateTaskSuccess(data.data));
  } catch (error) {
    yield put(actions.updateTaskFailure(error));
  }
}

function* deleteTask({ id }) {
  try {
    const { data } = yield call([axios, axios.delete], `/tasks/${id}`);
    yield put(actions.deleteTaskSuccess(data.data));
  } catch (error) {
    yield put(actions.deleteTaskFailure(error));
  }
}

function* disableTask({ id }) {
  try {
    const { data } = yield call([axios, axios.put], `/tasks/${id}/available`);
    yield put(actions.disableTaskSuccess(data.data));
  } catch (error) {
    yield put(actions.disableTaskFailure(error));
  }
}

function* fetchTasks() {
  try {
    const { data } = yield call([axios, axios.get], `/tasks`);
    yield put(actions.fetchTasksSuccess(data.data));
  } catch (error) {
    yield put(actions.fetchTasksFailure(error));
  }
}

/* WATCHERS */

function* watchCreateTaskRequest() {
  yield takeLatest(types.CREATE_TASK_REQUEST, createTask);
}

function* watchUpdateTaskRequest() {
  yield takeLatest(types.UPDATE_TASK_REQUEST, updateTask);
}

function* watchDeleteTaskRequest() {
  yield takeLatest(types.DELETE_TASK_REQUEST, deleteTask);
}

function* watchDisableTaskRequest() {
  yield takeLatest(types.DISABLE_TASK_REQUEST, disableTask);
}

function* watchFetchTasksRequest() {
  yield takeLatest(types.FETCH_TASKS_REQUEST, fetchTasks);
}

export default function* tasksSaga() {
  yield all([
    fork(watchCreateTaskRequest),
    fork(watchUpdateTaskRequest),
    fork(watchDeleteTaskRequest),
    fork(watchDisableTaskRequest),
    fork(watchFetchTasksRequest)
  ]);
}
