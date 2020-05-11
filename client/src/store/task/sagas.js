import { all, call, fork, takeLatest, put, select } from "redux-saga/effects";
import axios from "../axios";

import { types } from "./types";
import * as actions from "./actions";
import { selectTask } from "./selectors";

/* SUBROUTINES */

function* fetchTask({ id }) {
  try {
    /* const task = yield select(selectTask(id));
    if (task._id === id) return; */

    const { data } = yield call([axios, axios.get], `/tasks/${id}`);
    yield put(actions.fetchTaskSuccess(data.data));
  } catch (error) {
    yield put(actions.fetchTaskFailure(error));
  }
}

/* WATCHERS */

function* watchFetchTaskRequest() {
  yield takeLatest(types.FETCH_TASK_REQUEST, fetchTask);
}

export default function* taskSaga() {
  yield all([fork(watchFetchTaskRequest)]);
}
