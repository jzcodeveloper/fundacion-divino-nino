import { all, call, fork, takeLatest, put, select } from "redux-saga/effects";
import axios from "../axios";

import { types } from "./types";
import * as actions from "./actions";
import { setAuthToken } from "../../utils/utils";
import { history } from "../../history";

/* SUBROUTINES */

function* fetchGlobalStats() {
  try {
    const { data } = yield call([axios, axios.get], `/global`);

    yield put(actions.fetchGlobalStatsSuccess(data.data));
  } catch (error) {
    yield put(actions.fetchGlobalStatsFailure(error));
  }
}

/* WATCHERS */

function* watchFetchGlobalStatsRequest() {
  yield takeLatest(types.FETCH_GLOBAL_STATS_REQUEST, fetchGlobalStats);
}

export default function* appSaga() {
  yield all([fork(watchFetchGlobalStatsRequest)]);
}
