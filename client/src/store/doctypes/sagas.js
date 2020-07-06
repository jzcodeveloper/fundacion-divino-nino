import { all, call, fork, takeLatest, put, select } from "redux-saga/effects";
import axios from "../axios";

import { types } from "./types";
import * as actions from "./actions";

/* SUBROUTINES */

function* fetchDoctypes() {
  try {
    const endpoint = `/documents`;
    const params = { model: "DocType", populate: "permissions", limit: 100 };
    const options = { params };
    const { data } = yield call([axios, axios.get], endpoint, options);
    yield put(actions.fetchDoctypesSuccess(data.data));
  } catch (error) {
    yield put(actions.fetchDoctypesFailure(error));
  }
}

/* WATCHERS */

function* watchFetchDoctypesRequest() {
  yield takeLatest(types.FETCH_DOCTYPES_REQUEST, fetchDoctypes);
}

export default function* doctypeSaga() {
  yield all([fork(watchFetchDoctypesRequest)]);
}
