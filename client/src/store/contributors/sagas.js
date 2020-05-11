import { all, call, fork, takeLatest, put, select } from "redux-saga/effects";
import axios from "../axios";

import { types } from "./types";
import * as actions from "./actions";
import { selectTotal, selectResultsByPage } from "./selectors";

/* SUBROUTINES */

function* fetchContributors({ page, sort }) {
  try {
    const { data } = yield call([axios, axios.get], `/contributors`, {
      params: { page, sort }
    });

    yield put(actions.fetchContributorsSuccess(data.data));
  } catch (error) {
    yield put(actions.fetchContributorsFailure(error));
  }
}

/* WATCHERS */

function* watchfetchContributorsRequest() {
  yield takeLatest(types.FETCH_CONTRIBUTORS_REQUEST, fetchContributors);
}

export default function* contributorsSaga() {
  yield all([fork(watchfetchContributorsRequest)]);
}
