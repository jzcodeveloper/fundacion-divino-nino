import { types } from "./types";
import { types as tasksTypes } from "../tasks/types";
import produce from "immer";

import { initialState } from "./model";

export default (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.FETCH_DATASETS_REQUEST:
        draft.loading = true;
        break;

      case types.FETCH_DATASETS_SUCCESS:
        draft.datasets = payload;
        draft.error = null;
        draft.loading = false;
        break;

      case types.UPDATE_SPLIT_RATIO_SUCCESS:
      case types.EMPTY_DATASET_SUCCESS:
        const index = draft.datasets.findIndex(
          dataset => dataset._id === payload._id
        );
        draft.datasets[index] = payload;
        draft.error = null;
        break;

      case types.FETCH_DATASETS_FAILURE:
      case types.CREATE_DATA_FAILURE:
      case types.EXPORT_DATASET_FAILURE:
        draft.error = payload;
        draft.loading = false;
        break;

      case tasksTypes.UPDATE_TASK_SUCCESS: {
        const index = draft.datasets.findIndex(
          dataset => dataset._id === payload.dataset._id
        );
        draft.datasets[index] = payload.dataset;
        draft.error = null;
        break;
      }

      case tasksTypes.DELETE_TASK_SUCCESS: {
        const index = draft.datasets.findIndex(
          dataset => dataset._id === payload._id
        );
        draft.datasets.splice(index, 1);
        draft.error = null;
        break;
      }

      default:
        return draft;
    }
  });
