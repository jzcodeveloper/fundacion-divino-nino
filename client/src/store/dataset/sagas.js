import { all, call, fork, takeLatest, put, select } from "redux-saga/effects";
import axios from "../axios";

import { types } from "./types";
import * as actions from "./actions";
import { selectDataset } from "./selectors";

/* SUBROUTINES */

function* fetchDataset({ id }) {
  try {
    const dataset = yield select(selectDataset);
    if (dataset && dataset._id === id)
      yield put(actions.fetchDatasetSuccess(dataset));

    const { data } = yield call([axios, axios.get], `/datasets/${id}`);
    yield put(actions.fetchDatasetSuccess(data.data));
  } catch (error) {
    yield put(actions.fetchDatasetFailure(error));
  }
}

/* WATCHERS */

function* watchFetchDatasetRequest() {
  yield takeLatest(types.FETCH_DATASET_REQUEST, fetchDataset);
}

export default function* datasetSaga() {
  yield all([fork(watchFetchDatasetRequest)]);
}
