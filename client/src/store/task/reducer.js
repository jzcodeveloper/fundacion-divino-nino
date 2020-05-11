import { types } from "./types";
import produce from "immer";

import { initialState } from "./model";

export default (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.FETCH_TASK_REQUEST:
        draft.loading = true;
        break;

      case types.FETCH_TASK_SUCCESS:
        draft.task = payload;
        draft.error = null;
        draft.loading = false;
        break;

      case types.FETCH_TASK_FAILURE:
        draft.task = null;
        draft.error = payload;
        draft.loading = false;
        break;

      case types.RESET_TASK_REQUEST:
        draft.task = null;
        draft.error = null;
        draft.loading = true;
        break;
      default:
        return draft;
    }
  });
