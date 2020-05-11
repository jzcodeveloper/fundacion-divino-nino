import { all, call, fork, takeLatest, put } from "redux-saga/effects";
import axios from "../axios";

import { types } from "./types";
import * as actions from "./actions";
import { setAuthToken } from "../../utils/utils";
import { history } from "../../history";

/* SUBROUTINES */

function* loginAdmin({ payload }) {
  try {
    const { data } = yield call([axios, axios.post], `/admins/login`, payload);

    // Get token and set Authorization header
    const token = data.data;
    setAuthToken(token);

    yield put(actions.loginAdminSuccess(token));
  } catch (error) {
    yield put(actions.loginAdminFailure(error));
  }
}

function* getAdmin() {
  try {
    const { data } = yield call([axios, axios.get], `/admins/me`);

    yield put(actions.getAdminSuccess(data.data));

    history.push("/dashboard");
  } catch (error) {
    yield put(actions.getAdminFailure(error));
  }
}

function* updateAdmin({ payload }) {
  try {
    const { data } = yield call([axios, axios.post], `/admins/me`, payload);

    yield put(actions.updateAdminSuccess(data.data));

    history.push("/dashboard");
  } catch (error) {
    yield put(actions.updateAdminFailure(error));
  }
}

function* updatePassword({ payload }) {
  try {
    const { data } = yield call(
      [axios, axios.post],
      `/admins/me/password`,
      payload
    );

    yield put(actions.updatePasswordSuccess(data.data));

    history.push("/dashboard");
  } catch (error) {
    yield put(actions.updatePasswordFailure(error));
  }
}

function* fetchLogs({ page, sort }) {
  try {
    const { data } = yield call([axios, axios.get], `/admins/me/logs`, {
      params: { page, sort },
    });

    yield put(actions.fetchLogsSuccess(data.data));
  } catch (error) {
    yield put(actions.fetchLogsFailure(error));
  }
}

/* FLOWS */

function* loginAdminRequest(action) {
  yield call(loginAdmin, action);
  yield call(getAdmin);
}

/* WATCHERS */

function* watchLoginAdminRequest() {
  yield takeLatest(types.LOGIN_ADMIN_REQUEST, loginAdminRequest);
}

function* watchUpdateAdminRequest() {
  yield takeLatest(types.UPDATE_ADMIN_REQUEST, updateAdmin);
}

function* watchUpdatePasswordRequest() {
  yield takeLatest(types.UPDATE_PASSWORD_REQUEST, updatePassword);
}

function* watchFetchLogsRequest() {
  yield takeLatest(types.FETCH_LOGS_REQUEST, fetchLogs);
}

export default function* adminSaga() {
  yield all([
    fork(watchLoginAdminRequest),
    fork(watchUpdateAdminRequest),
    fork(watchUpdatePasswordRequest),
    fork(watchFetchLogsRequest),
  ]);
}
