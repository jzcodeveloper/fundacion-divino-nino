import { all, call, fork, takeLatest, put } from "redux-saga/effects";
import axios from "../axios";

import { types } from "./types";
import * as actions from "./actions";
import { setAuthToken } from "../../utils/utils";
import { history } from "../../history";

/* SUBROUTINES */

function* loginUser({ payload }) {
  try {
    const { data } = yield call([axios, axios.post], `/users/login`, payload);

    // Get token and set Authorization header
    const token = data.data;
    setAuthToken(token);

    yield put(actions.loginUserSuccess(token));
  } catch (error) {
    yield put(actions.loginUserFailure(error));
  }
}

function* getUser() {
  try {
    const { data } = yield call([axios, axios.get], `/users/me`);

    yield put(actions.getUserSuccess(data.data));
  } catch (error) {
    yield put(actions.getUserFailure(error));
  }
}

/* FLOWS */

function* loginUserRequest(action) {
  yield call(loginUser, action);
  yield call(getUser);
}

/* WATCHERS */

function* watchLoginUserRequest() {
  yield takeLatest(types.LOGIN_USER_REQUEST, loginUserRequest);
}

export default function* adminSaga() {
  yield all([fork(watchLoginUserRequest)]);
}
