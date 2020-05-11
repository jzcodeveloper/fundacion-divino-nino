import { all, call, fork, takeLatest, put, select } from "redux-saga/effects";
import axios from "../axios";

import { types } from "./types";
import * as actions from "./actions";
import { setAuthToken } from "../../utils/utils";
import { history } from "../../history";

/* SUBROUTINES */

function* loginContributor({ payload }) {
  try {
    const { data } = yield call(
      [axios, axios.post],
      `/contributors/login`,
      payload
    );

    // Get token and set Authorization header
    const token = data.data;
    setAuthToken(token);

    yield put(actions.loginContributorSuccess(token));
  } catch (error) {
    yield put(actions.loginContributorFailure(error));
  }
}

function* getContributor() {
  try {
    const { data } = yield call([axios, axios.get], `/contributors/me`);

    console.log(data);

    yield put(actions.getContributorSuccess(data.data));

    history.push("/tasks/overview");
  } catch (error) {
    yield put(actions.getContributorFailure(error));
  }
}

function* fetchHistory({ page, sort }) {
  try {
    const { data } = yield call(
      [axios, axios.get],
      `/contributors/me/history`,
      {
        params: { page, sort },
      }
    );

    yield put(actions.fetchHistorySuccess(data.data));
  } catch (error) {
    yield put(actions.fetchHistoryFailure(error));
  }
}

/* FLOWS */

function* loginContributorRequest(action) {
  yield call(loginContributor, action);
  yield call(getContributor);
}

/* WATCHERS */

function* watchLoginContributorRequest() {
  yield takeLatest(types.LOGIN_CONTRIBUTOR_REQUEST, loginContributorRequest);
}

function* watchFetchHistoryRequest() {
  yield takeLatest(types.FETCH_HISTORY_REQUEST, fetchHistory);
}

export default function* contributorSaga() {
  yield all([
    fork(watchLoginContributorRequest),
    fork(watchFetchHistoryRequest),
  ]);
}
